<?php

namespace app\push\controller;

use think\worker\Server;

class Worker extends Server
{
    protected $socket = 'websocket://127.0.0.1:1234';

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
        // $connection->send('我收到你的信息了'+$connection->id);
        try{
            $data = json_decode($data, true);
            if(!isset($data['method'])){
                throw new \Exception('没有请求的方法参数！');
            }
            switch($data['method']){
                case 'sendMsg':
                    // var_dump($this->worker->connections);
                    $data = $data['data'];
                    if(!isset($data['message']) || !isset($data['Uid'])){
                        throw new \Exception('没有用户id或者信息');
                    }
                    if(!$this->sendByUid($data['Uid'],[
                        'trigger'=>'acceptMsg',
                        'data'=> [
                            'message'=> $data['message'],
                            'sendUser'=> $connection->id.'--'.$connection->getRemoteIp(),
                            'date'=>date("h:i:sa")
                        ]
                    ])){
                        throw new \Exception('用户不在线！');
                    }
                break;
            }
        }catch(\Exception $e){
            $connection->send(json_encode([
                'trigger' => 'Error',
                'message' => $e->getMessage(),
            ]));
        }
        
    }

    /**
     * 当连接建立时触发的回调函数
     * @param $connection
     */
    public function onConnect($connection)
    {
        // var_dump($connection->getRemoteIp());
        // var_dump($connection);
        //将用户添加到用户群列表中
        // $this->uidConnections[$connection->id] = $connection;
        //每个用户发送用户列表
        
        $connection->send(json_encode([
            'trigger' => 'setUid',
            'data' => [
                'Uid' => $connection->id,
                'name' => $connection->id.'--'.$connection->getRemoteIp()
            ]
        ]));
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
        foreach($this->worker->connections as $connection){
            $connection->send($message);
        }
    }

    /**
     * 指定uid推送数据
     * @param $uid
     * @param $message
     */
    public function sendByUid($uid, $message){
        if(is_array($message) || is_object($message)){
            $message = json_encode($message);
        }
        if(isset($this->worker->connections[$uid])){
            $this->worker->connections[$uid]->send($message);
            return true;
        }
        return false;
    }

    
    /**
     * 获取所有用户信息
     * @param $uid
     * @param $message
     */
    public function getAllUid(){
     
        $array = array();
        foreach($this->worker->connections as $connection){
            $array[$connection->id] = $connection->id.'--'.$connection->getRemoteIp();
        }
        return $array;
    }
}
