<?php
/**
 * Created by PhpStorm.
 * User: chenhao522
 * Date: 2017/8/18
 * Time: 12:55
 */
namespace app\index\model;
use think\Model;

class User extends Model{
    protected $autoWriteTimestamp = true;
    protected $createTime = 'user_create_time';
    protected $updateTime = 'last_time';

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

}