<?php
namespace app\index\controller;
use think\Controller;

class Index extends Controller{
    public function index()
    {
        $mc = new \Memcache();
        $mc->connect('127.0.0.1', '11211');
        return $this->view->fetch();
    }

}
