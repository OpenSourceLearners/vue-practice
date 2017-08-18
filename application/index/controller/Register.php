<?php
/**
 * Created by PhpStorm.
 * User: chenhao522
 * Date: 2017/8/18
 * Time: 13:06
 */
namespace app\index\controller;

use app\common\controller\Base;
use app\index\model\User;
use think\Db;
class Register extends Base{
    public function index(){
        return $this->view->fetch('register');
    }
    public function register(){
        if(request()->isAjax()){
            $user = new User();
            $data = input('post.');
            $reg = User::create($data);
            if($reg->user_id){
                return ['code'=>'200','msg'=>'注册成功！','data'=>$reg->user_id];
            }else{
                return ['code'=>'400','msg'=>'注册失败了呀,重新注册一次吧！','data'=>''];
            }
        }else{
            return ['code'=>'400','msg'=>'当前不是Ajax请求!','data'=>''];
        }
    }
    public function verify(){
        $data = input('post.verify');
        if(!captcha_check($data)){
            return ['code'=>'200','msg'=>'验证码错误','data'=>''];
        }else{
            return ['code'=>'400','msg'=>'验证码正确','data'=>''];
        }
    }
    public function verifyEmail(){
        $data = input('post.email');
        $res=Db::name('user')->where(array('email'=>$data))->find();
        if($res){
            return ['code'=>'200','msg'=>'邮箱被注册了！','data'=>''];
        }else{
            return ['code'=>'400','msg'=>'邮箱没有重复！','data'=>''];
        }
    }
    public function verifyUserName(){
        $data = input('post.username');
        $res=Db::name('user')->where(array('username'=>$data))->find();
        if($res){
            return ['code'=>'200','msg'=>'用户名被注册了！','data'=>''];
        }else{
            return ['code'=>'400','msg'=>'用户名没有重复！','data'=>''];
        }
    }
}