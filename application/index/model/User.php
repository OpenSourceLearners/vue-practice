<?php
/**
 * Created by PhpStorm.
 * User: chenhao522
 * Date: 2017/8/18
 * Time: 12:55
 */
namespace app\index\model;
use think\Model;
use think\Db;

class User extends Model{
    protected $autoWriteTimestamp = true;
    protected $createTime = 'user_create_time';
    protected $updateTime = 'last_time';
    protected $where;  //查询条件

    public function setUpdateTimeAttr($value){
        return time();
    }
    public function setCreateTimeAttr($value){
        return time();
    }
    public function setPassWordAttr($value){
        return md5($value);
    }
    public function setLastIpAttr($value){
            return request()->ip();
    }
    public function getUserInfo($where){
         $data = Db::name('user')->where(array('user_id'=>$where))->find();
         if($data){
             return $data;
         }else{
             return false;
         }
    }
    public function checkToKen($token,$usertoken){
        if($token==$usertoken){
            return true;
        }else{
            return false;
        }
    }

}