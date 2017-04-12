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
$query_trips = "SELECT 
nurseprofile.hdw_id,
nurseprofile.First_Name,
nurseprofile.Last_Name,	
nurseprofile.lat,	
nurseprofile.lng,	
nurseprofile.Email,	
nurseprofile.Cell,	
nurseprofile.ExperienceYears,	
nurseprofile.Address,	
nurseprofile.myUUID,
nurseprofile.Language,	
nurseprofile.Sex,	
nurseprofile.PatientYears,	
nurseprofile.Type,	
nurseprofile.Pic,	
nurseprofile.Edu,	
nurseprofile.Admit_Date,	
nurseprofile.Discharge_Date,	
nurseprofile.Diagnosis,	
nurseprofile.Level_Care,	
nurseprofile.Hire_Date
FROM nurseprofile where nurseprofile.myUUID='42' AND nurseprofile.Address!='' AND nurseprofile.lat!='' order by nurseprofile.Type ASC";
$trips = mysql_query($query_trips, $eventlog) or die(mysql_error());
$row_trips = mysql_fetch_assoc($trips);
$totalRows_trips = mysql_num_rows($trips);

 $b=0;
?>
[<?php ; $b=0; do {  ?><?php  echo '{ "id" : "';  ?><?php echo $row_trips['hdw_id']; ?>
<?php echo '", "First_Name" : "'; ?><?php echo $row_trips['First_Name']; ?>
<?php echo '", "Last_Name" : "'; ?><?php echo $row_trips['Last_Name']; ?>
<?php echo '", "lat" : "'; ?><?php echo $row_trips['lat']; ?>
<?php echo '", "lng" : "'; ?><?php echo $row_trips['lng']; ?>
<?php echo '", "Email" : "'; ?><?php echo $b; ?>
<?php echo '", "myUUID" : "'; ?><?php echo $row_trips['myUUID']; ?>
<?php echo '", "Cell" : "'; ?><?php echo $row_trips['Cell']; ?>
<?php echo '", "ExperienceYears" : "'; ?><?php echo $row_trips['ExperienceYears']; ?>
<?php echo '", "Language" : "'; ?><?php echo $row_trips['Language']; ?>
<?php echo '", "Sex" : "'; ?><?php echo $row_trips['Sex']; ?>
<?php echo '", "Address" : "'; ?><?php echo preg_replace( '/\r|\n/', '',$row_trips['Address']); ?>
<?php echo '", "PatientYears" : "'; ?><?php echo $row_trips['PatientYears']; ?><?php echo '", "Type" : "'; ?><?php echo $row_trips['Type']; ?>
<?php echo '", "Pic" : "'; ?><?php echo $row_trips['Pic']; ?>
<?php echo '", "Edu" : "'; ?><?php echo $row_trips['Edu']; ?>
<?php echo '", "Admit_Date" : "'; ?><?php echo $row_trips['Admit_Date']; ?>
<?php echo '", "Discharge_Date" : "'; ?><?php echo $row_trips['Discharge_Date']; ?>
<?php echo '", "Diagnosis" : "'; ?><?php echo $row_trips['Diagnosis']; ?>
<?php echo '", "Level_Care" : "'; ?><?php echo $row_trips['Level_Care']; ?>
<?php echo '", "Hire_Date" : "'; ?><?php echo $row_trips['Hire_Date']; ?>" }<?php if($b<$totalRows_trips-1) { echo ','; } ?><?php $b++; } while ($row_trips = mysql_fetch_assoc($trips)); ?>]

