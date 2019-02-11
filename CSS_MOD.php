<?php 
/**
 * @author     Victor Kulyabin <v.kulyabin@clientlab.ru>
 * @copyright  2019 Victor Kulyabin
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.0.0
 * @link       https://github.com/clientlab/mod_boilerplate
 */

DEFINE('HTML_BLOCKS_PREFIX','css_mod__');
DEFINE('BLOCKS_PATH','./css/blocks/');
DEFINE('COMMON_PATH','./css/common/');
DEFINE('COMMON_BUNDLE','common.css');

$postData = file_get_contents('php://input');
$postData = json_decode($postData, true);

$result = array(
		'common_css' => '',
		'common_css_sum' => '',
		'blocks_css' => '',
		'blocks_css_sum' => ''
	);

$components = scandir(BLOCKS_PATH);

$blocksPure = array();

foreach ($postData['blocks'] as $key => $value) {
	$pureVal = str_replace(HTML_BLOCKS_PREFIX, "", $value);
	array_push($blocksPure, $pureVal);
}

$blocksPure = array_unique($blocksPure);

foreach ($components as $key => $value) {
	if (in_array($value, $blocksPure)) {
		$fileContents = file_get_contents(BLOCKS_PATH . $value . "/".$value.".css");
		$fileContents = str_replace('../', "/", $fileContents);
		$result['blocks_css'] .= $fileContents;
	}
}

$result['blocks_css_sum'] .= md5($result['blocks_css']);

$result['common_css'] = file_get_contents(COMMON_PATH . COMMON_BUNDLE);
$result['common_css_sum'] = hash_file('md5', COMMON_PATH . COMMON_BUNDLE);
$result['common_css'] = str_replace('../', "/", $result['common_css']);

echo json_encode($result);

?>