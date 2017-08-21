<?php
/**
 * Created by PhpStorm.
 * User: chenhao522
 * Date: 2017/8/18
 * Time: 13:42
 */
namespace app\common\controller;
use think\Controller;
class Base extends Controller{
    protected function _empty(){
        return array('code'=>'400','msg'=>'空操作','data'=>'');
    }
    protected function GetError($msg='',$data=''){
         return json(['code'=>'400','msg'=>$msg,'data'=>$data]);
    }
    protected function GetCorrect($msg='',$data=''){
        return json(['code'=>'200','msg'=>$msg,'data'=>$data]);
    }
}