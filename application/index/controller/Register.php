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
                return $this->GetCorrect('注册成功！',['userid'=>$reg->user_id]);
            }else{
                return $this->GetError('注册失败了呀,重新注册一次吧！');
            }
        }else{
            return $this->GetError('当前不是Ajax操作！');
        }
    }
//    public function verify(){
//        $data = input('post.verify');
//        if(!captcha_check($data)){
//            return ['code'=>'200','msg'=>'验证码错误','data'=>''];
//        }else{
//            return ['code'=>'400','msg'=>'验证码正确','data'=>''];
//        }
//    }
    public function verifyEmail(){
        $data = input('post.email');
        $res=Db::name('user')->where(array('email'=>$data))->find();
        if($res){
            return $this->GetError('邮箱已被注册！');
        }else{
            return $this->GetCorrect('邮箱未被注册！');
        }
    }
    public function verifyUserName(){
        $data = input('post.username');
        $res=Db::name('user')->where(array('username'=>$data))->find();
        if($res){
            return $this->GetCorrect('用户名未被注册！');
        }else{
            return $this->GetError('用户名已被注册！');
        }
    }
}