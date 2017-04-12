  <?php header('Access-Control-Allow-Origin: *'); ?>
<?php require_once('../../Connections/eventlog.php'); ?>
<?php
if (!function_exists("POSTSQLValueString")) {
function POSTSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = POST_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}

mysql_select_db($database_eventlog, $eventlog);
$query_tripid = "SELECT Distinct(routeitlochist.myUUID) as UUID FROM routeitlochist";
$tripid = mysql_query($query_tripid, $eventlog) or die(mysql_error());
$row_tripid = mysql_fetch_assoc($tripid);
$totalRows_tripid = mysql_num_rows($tripid);

echo '['; $b=0; do {
$UUID=$row_tripid['UUID'];	
	mysql_select_db($database_eventlog, $eventlog);
$query_tripsmax = "SELECT max(routeitlochist.hdw_id) as maxid FROM routeitlochist where routeitlochist.myUUID='$UUID'";
$tripsmax = mysql_query($query_tripsmax, $eventlog) or die(mysql_error());
$row_tripsmax = mysql_fetch_assoc($tripsmax);
$totalRows_tripsmax = mysql_num_rows($tripsmax);

//------------------------------------------
  do { 
$maxid=$row_tripsmax['maxid'];
mysql_select_db($database_eventlog, $eventlog);
$query_trips = "SELECT routeitlochist.hdw_id, routeitlochist.lat, routeitlochist.lng, routeitlochist.myUUID, routeitlochist.planid, routeitlochist.tripid, routeitlochist.histid FROM routeitlochist where routeitlochist.hdw_id='$maxid'";
$trips = mysql_query($query_trips, $eventlog) or die(mysql_error());
$row_trips = mysql_fetch_assoc($trips);
$totalRows_trips = mysql_num_rows($trips); 

 ?><?php  echo '{ "maxid" : "';  ?><?php echo $row_trips['hdw_id']; ?><?php echo '", "lat" : "'; ?><?php echo $row_trips['lat']; ?><?php echo '", "lng" : "'; ?><?php echo $row_trips['lng']; ?><?php echo '", "tripid" : "'; ?><?php echo $row_trips['tripid']; ?><?php echo '", "histid" : "'; ?><?php echo $row_trips['histid']; ?><?php echo '", "myUUID" : "'; ?><?php echo $row_trips['myUUID']; ?><?php echo '", "planid" : "'; ?><?php echo $row_trips['planid']; ?>" }<?php  if($b<$totalRows_tripid-1) { echo ','; }  } while ($row_trips = mysql_fetch_assoc($trips)); ?>


<?php //------------------------------------


$b++; } while ($row_tripid = mysql_fetch_assoc($tripid)); ?>]