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

if(isset($_POST['uuid']) && $_POST['uuid']!='')  { 
$myuuid=$_POST['uuid']; 
mysql_select_db($database_eventlog, $eventlog);
$query_myuuid = "SELECT nurseprofile.myUUID FROM nurseprofile where nurseprofile.myUUID='$myuuid'";
$myuuid = mysql_query($query_myuuid, $eventlog) or die(mysql_error());
$row_myuuid = mysql_fetch_assoc($myuuid);
$totalRows_myuuid = mysql_num_rows($myuuid);
$uid=$row_myuuid['myUUID'];
} else { $uid=33;}

mysql_select_db($database_eventlog, $eventlog);
$query_maxuuid = "SELECT max(nurseprofile.myUUID) as maxUUID FROM nurseprofile";
$maxuuid = mysql_query($query_maxuuid, $eventlog) or die(mysql_error());
$row_maxuuid = mysql_fetch_assoc($maxuuid);
$totalRows_maxuuid = mysql_num_rows($maxuuid);
	
if(isset($_POST['First_Name']) && $_POST['Last_Name']!='')  { 
$Fname=$_POST['First_Name']; 
$Lname=$_POST['Last_Name'];

mysql_select_db($database_eventlog, $eventlog);
$query_routeuser = "SELECT nurseprofile.myUUID FROM nurseprofile where nurseprofile.First_Name='$Fname' AND nurseprofile.Last_Name='$Lname'";
$routeuser = mysql_query($query_routeuser, $eventlog) or die(mysql_error());
$row_routeuser = mysql_fetch_assoc($routeuser);
$totalRows_routeuser = mysql_num_rows($routeuser);
$myUUID=$row_routeuser['myUUID'];
} else  {
$myUUID='no';
}
?>[{"user":"<?php echo $myUUID; ?>","maxUUID":"<?php echo $row_maxuuid['maxUUID']; ?>","myUUID":"<?php echo $uid; ?>"}]







