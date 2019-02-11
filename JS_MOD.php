<?php 
/**
 * @author     Victor Kulyabin <v.kulyabin@clientlab.ru>
 * @copyright  2019 Victor Kulyabin
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.0.0
 * @link       https://github.com/clientlab/mod_boilerplate
 */

DEFINE('HTML_BLOCKS_PREFIX','js_mod__');
DEFINE('BLOCKS_PATH','./js/blocks/');
DEFINE('BLOCKS_DEP_PATH','./src/js/blocks/');
DEFINE('LIB_PATH','./js/lib/');


$postData = file_get_contents('php://input');
$postData = json_decode($postData, true);

$result = array(
		'blocks_js' => '',
		'dependencies' => '',
		'blocks_js_sum' => ''
	);

$components = scandir(BLOCKS_PATH);
$blocksPure = array();

$dependenciesArr = array();

foreach ($postData['blocks'] as $key => $value) {
	$pureVal = str_replace(HTML_BLOCKS_PREFIX, "", $value);
	array_push($blocksPure, $pureVal);
}

$blocksPure = array_unique($blocksPure);

foreach ($components as $key => $value) {
	if (in_array($value, $blocksPure)) {

		$dependencies = explode(', ', json_decode(file_get_contents(BLOCKS_DEP_PATH . $value . "/dep.json"), true)['libs']);

		if (count($dependencies)>0) {
			foreach ($dependencies as $k => $v) {
				array_push($dependenciesArr, $v);
			}
		}

		$fileContents = file_get_contents(BLOCKS_PATH . $value . "/".$value.".js");
		$fileContents = str_replace('../', "/", $fileContents);
		$result['blocks_js'] .= $fileContents;
	}
}

$dependenciesArr = array_unique($dependenciesArr);
$dependenciesRes = '';
foreach ($dependenciesArr as $key => $value) {
	$libCont = file_get_contents(LIB_PATH . $value . "/".$value.".js");
	if ($libCont!='') {
		$dependenciesRes .= $libCont ."\n";
	}
}

$result['blocks_js'] = $dependenciesRes . $result['blocks_js'];

$result['blocks_js_sum'] .= md5($result['blocks_js']);

echo json_encode($result, JSON_HEX_QUOT | JSON_HEX_APOS | JSON_HEX_AMP);

?>