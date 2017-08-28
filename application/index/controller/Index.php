<?php
namespace app\index\controller;
use app\index\model\User;
use app\common\controller\Base;
class Index extends Base{
    public function index()
    {
        return $this->view->fetch();
    }
    public function userInfo(){
        // $where=isset(session('Uid'))?session('Uid'):0;
        $where = Session::has('Uid') ? Sessoin::get('Uid') : 0;
        $user = new User();
        $data= $user->getUserInfo($where);
        try {
            if ($data) {
                return $this->GetCorrect('用户信息',['UserInfo'=>$data]);
            } else {
                throw new \Exception('查询错误，没有该用户');
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public function isChekToKen(){
        $userToKen = input('get.token');
        $toKen = session('token');
        $userModel = new User();
        $data=$userModel->checkToKen($toKen, $userToKen);
        try{
            if($data){
               return true;
            }else{
               throw new \Exception('token验证失败');
            }
        } catch (\Exception $e){
            return $e->getMessage();
        }
    }
}
