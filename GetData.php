<?php
# recieve data
if(isset($_POST)){
    file_get_contents("php://input");
    $location = json_decode($data,true);
    echo $location["loc"]
}
else{
    echo "No data";
}