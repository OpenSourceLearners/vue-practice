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
            $user = Db::name('user')->where($where)->find();
            if ($user) {
                Db::name('user')->where(array('user_id' => $user['user_id']))->update(array('last_time' => time(), 'last_ip' => request()->ip()));
                $token = md5($user['username'] . $user['user_id']);
                session('Uid', $user['user_id']);
                session('token', $token);
                return ['code' => '200', 'msg' => '登录成功！', 'data' => $token];
            } else {
                return ['code' => '400', 'msg' => '登录失败!', 'data' => ''];
            }
        } else {
            return ['code' => '400', 'msg' => '当前不是Ajax请求！', 'data' => ''];
        }
    }
//    验证码
    public function verify(){
        $data = input('post.verify');
        if(!captcha_check($data)){
            return ['code'=>'200','msg'=>'验证码错误','data'=>''];
        }else{
            return ['code'=>'400','msg'=>'验证码正确','data'=>''];
        }
    }
//    退出登录
    public function outlogin(){
        session_destroy();
        return ['code'=>'200','msg'=>'退出登录','data'=>''];
    }

}
