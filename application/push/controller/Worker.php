<?php

namespace app\push\controller;

use think\worker\Server;

class Worker extends Server
{
    protected $socket = 'websocket://127.0.0.1:1234';
    protected $uidConnections = array();

    /**
     * 收到信息
     * @param $connection
     * @param $data
     */
    public function onMessage($connection, $data)
    {
        // foreach($connection as $k => $v){
        //     var_dump($v);
        // }
        // $mc = new \Memcache();
        // $mc->connect('127.0.0.1', 11211);
        // $name = $mc->get($connection->id);
        // $mc->close();
        // var_dump($name);
        $connection->send('我收到你的信息了'+$connection->id);
    }

    /**
     * 当连接建立时触发的回调函数
     * @param $connection
     */
    public function onConnect($connection)
    {
        //将用户添加到用户群列表中
        $this->uidConnections[$connection->id] = $connection;
        //每个用户发送用户列表
        $this->broadcast(json_encode(['trigger' => 'updateUserList', 'data' => $this->getAllUid()]));
        // foreach($connection as $k => $v){
        //     var_dump($v);
        // }
        // $mc = new \Memcache();
        // $mc->connect('127.0.0.1', 11211);
        // $mc->set($connection->id, $connection->name);
        // $mc->close();

    }

    /**
     * 当连接断开时触发的回调函数
     * @param $connection
     */
    public function onClose($connection)
    {
        // foreach($connection as $k => $v){
        //     var_dump($v);
        // }
        unset($this->uidConnections[$connection->id]);
    }

    /**
     * 当客户端的连接上发生错误时触发
     * @param $connection
     * @param $code
     * @param $msg
     */
    public function onError($connection, $code, $msg)
    {
        echo "error $code $msg\n";
    }

    /**
     * 每个进程启动
     * @param $worker
     */
    public function onWorkerStart($worker)
    {

    }

    
    /**
     * 向所有连接的用户推送消息
     * @param $message
     */
    public function broadcast($message){
        foreach($this->uidConnections as $connection){
            $connection->send($message);
        }
    }

    /**
     * 指定uid推送数据
     * @param $uid
     * @param $message
     */
    public function sendByUid($uid, $message){
        if(isset($this->uidConnections[$uid])){
            $this->uidConnections[$uid]->send($message);
        }
    }

    
    /**
     * 指定uid推送数据
     * @param $uid
     * @param $message
     */
    public function getAllUid(){
        $array = array();
        foreach($this->uidConnections as $connection){
            $array[$connection->uid] = $connection->_remoteAddress;
        }
        return $array;
    }
}
