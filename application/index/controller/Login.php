<?php
/**
 * Created by PhpStorm.
 * User: chenhao522
 * Date: 2017/8/18
 * Time: 13:40
 */
namespace app\index\controller;
use app\common\controller\Base;
use think\Db;
class Login extends Base {
    public function index(){
        return $this->view->fetch('login');
    }
//      登录
    public function login(){
        if (request()->isAjax()) {
            $data = input('post.');
            if (strrpos($data['username'], '@') > 0) {
                $where['email'] = $data['username'];
            } else {
                $where['username'] = $data['username'];
            }
            $where['password']=md5($data['password']);
            $user = Db::name('user')->where($where)->find();
            if ($user) {
                Db::name('user')->where(array('user_id' => $user['user_id']))->update(array('last_time' => time(), 'last_ip' => request()->ip()));
                $token = md5($user['username'] . $user['user_id'].rand(999, 9999).time());
                session('Uid',$user['user_id']);
                session('token',$token);
                $mem = new \Memcache();
                $mem->connect('127.0.0.1','11211');
                $UserInfo[]=['UserName'=>$user['username'],'UserId'=>$user['user_id'],'token'=>$token];
                $mem->set('UserInfo', $UserInfo);
                return $this->GetCorrect('登录成功！',['token'=>$token]);
            }else {
                return $this->GetError('登录失败，账号或密码错误');
            }
        } else {
            return $this->GetError('当前不是Ajax操作！');
        }
    }
//    验证码
//    public function verify(){
//        $data = input('post.verify');
//        if(!captcha_check($data)){
//            return ['code'=>'200','msg'=>'验证码错误','data'=>''];
//        }else{
//            return ['code'=>'400','msg'=>'验证码正确','data'=>''];
//        }
//    }
//    退出登录
    public function outlogin(){
        session('Uid','');
        session('token','');
        return $this->GetCorrect('退出登录成功！');
    }

}
