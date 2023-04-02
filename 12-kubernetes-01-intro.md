# Домашнее задание к занятию "12.1 Компоненты Kubernetes"

> Вы DevOps инженер в крупной компании с большим парком сервисов. Ваша задача — разворачивать эти продукты в корпоративном кластере. 

## Задача 1: Установить Minikube

> Для экспериментов и валидации ваших решений вам нужно подготовить тестовую среду для работы с Kubernetes. Оптимальное решение — развернуть на рабочей машине Minikube.
>
> <details><summary>Инструкция по установке</summary>
>
> ### Как поставить на AWS:
> - создать EC2 виртуальную машину (Ubuntu Server 20.04 LTS (HVM), SSD Volume Type) с типом **t3.small**. Для работы потребуется настроить Security Group для доступа по ssh. Не забудьте указать keypair, он потребуется для подключения.
> - подключитесь к серверу по ssh (ssh ubuntu@<ipv4_public_ip> -i <keypair>.pem)
> - установите миникуб и докер следующими командами:
>   - curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
>   - chmod +x ./kubectl
>   - sudo mv ./kubectl /usr/local/bin/kubectl
>   - sudo apt-get update && sudo apt-get install docker.io conntrack -y
>   - curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
> - проверить версию можно командой minikube version
> - переключаемся на root и запускаем миникуб: minikube start --vm-driver=none
> - после запуска стоит проверить статус: minikube status
> - запущенные служебные компоненты можно увидеть командой: kubectl get pods --namespace=kube-system
> 
> ### Для сброса кластера стоит удалить кластер и создать заново:
> - minikube delete
> - minikube start --vm-driver=none
> 
> Возможно, для повторного запуска потребуется выполнить команду: sudo sysctl fs.protected_regular=0
> 
> Инструкция по установке Minikube - [ссылка](https://kubernetes.io/ru/docs/tasks/tools/install-minikube/)
> 
> **Важно**: t3.small не входит во free tier, следите за бюджетом аккаунта и удаляйте виртуалку.
>
> </details>

Установил на ВМ в Яндекс.Облаке.

```console
$ ssh yc-user@51.250.11.80
Warning: Permanently added '51.250.11.80' (ED25519) to the list of known hosts.
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-117-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
Last login: Tue Jun 14 19:08:14 2022 from 5.189.26.61
yc-user@netology121-vm1:~$ sudo -i
root@netology121-vm1:~# kubectl get pods --namespace=kube-system
NAME                                      READY   STATUS    RESTARTS   AGE
coredns-64897985d-cl95j                   1/1     Running   0          7m19s
etcd-netology121-vm1                      1/1     Running   0          7m31s
kube-apiserver-netology121-vm1            1/1     Running   0          7m31s
kube-controller-manager-netology121-vm1   1/1     Running   0          7m31s
kube-proxy-kzjmk                          1/1     Running   0          7m20s
kube-scheduler-netology121-vm1            1/1     Running   0          7m31s
metrics-server-6b76bd68b6-c8rsm           1/1     Running   0          7m11s
storage-provisioner                       1/1     Running   0          7m28s
```

## Задача 2: Запуск Hello World

> После установки Minikube требуется его проверить. Для этого подойдет стандартное приложение hello world. А для доступа к нему потребуется ingress.
> 
> - развернуть через Minikube тестовое приложение по [туториалу](https://kubernetes.io/ru/docs/tutorials/hello-minikube/#%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BB%D0%B0%D1%81%D1%82%D0%B5%D1%80%D0%B0-minikube)
> - установить аддоны ingress и dashboard

### Развернуть через Minikube тестовое приложение

Сервисы
```console
root@netology121-vm1:~# kubectl get deployment | grep hello
hello-node   1/1     1            1           12m
```
Деплоймент
```console
root@netology121-vm1:~# kubectl get services | grep hello
hello-node   LoadBalancer   10.105.50.197   <pending>     8080:30122/TCP   12m
```
Под
```console
root@netology121-vm1:~# kubectl get pods | grep hello
hello-node-6b89d599b9-w5kvx   1/1     Running   0          12m
```
Сервисы minikube
```console
root@netology121-vm1:~# minikube service list | grep hello
| default              | hello-node                         |         8080 | http://10.128.0.25:30122 |
```
### Установить аддоны ingress и dashboard

```console
root@netology121-vm1:~# minikube addons list | grep enabled
| dashboard                   | minikube | enabled ✅   | kubernetes                     |
| default-storageclass        | minikube | enabled ✅   | kubernetes                     |
| ingress                     | minikube | enabled ✅   | unknown (third-party)          |
| metrics-server              | minikube | enabled ✅   | kubernetes                     |
| storage-provisioner         | minikube | enabled ✅   | google                         |
```

## Задача 3: Установить kubectl

> Подготовить рабочую машину для управления корпоративным кластером. Установить клиентское приложение kubectl.
> - подключиться к minikube 
> - проверить работу приложения из задания 2, запустив port-forward до кластера

Установил minikube на отдельном сервере с Debian 11:
* скопировал конфигурацию `.kube` и `.minicube` с ВМ на Яндексе на отдельный хост
  ```console
  $ ll .kube/
  total 8
  drwxr-x--- 4 sergey sergey 4096 Jun 15 00:21 cache
  -rw-r--r-- 1 sergey sergey  827 Jun 15 00:22 config
  00:39:44 ~ sergey@ekbvm:~
  ```
  ```console
  $ ll .minikube/
  total 48
  drwxr-xr-x 2 sergey docker 4096 Jun 15 00:24 addons
  drwxr-xr-x 3 sergey docker 4096 Jun 15 00:24 cache
  -rw-r--r-- 1 sergey docker 1111 Jun 15 00:24 ca.crt
  -rw------- 1 sergey docker 1679 Jun 15 00:24 ca.key
  drwxr-xr-x 2 sergey docker 4096 Jun 15 00:24 certs
  drwxr-xr-x 2 sergey docker 4096 Jun 15 00:24 config
  drwxr-xr-x 2 sergey docker 4096 Jun 15 00:24 files
  drwxr-xr-x 2 sergey docker 4096 Jun 15 00:24 logs
  -rw------- 1 sergey docker    0 Jun 15 00:24 machine_client.lock
  drwxr-xr-x 3 sergey docker 4096 Jun 15 00:24 machines
  drwxr-xr-x 3 sergey docker 4096 Jun 15 00:24 profiles
  -rw-r--r-- 1 sergey docker 1119 Jun 15 00:24 proxy-client-ca.crt
  -rw------- 1 sergey docker 1679 Jun 15 00:24 proxy-client-ca.key
  ```
* исправил `server` в `.kube/config`:
  ```console
  $ kubectl config view | grep server
      server: https://51.250.11.80:8443
  ```
* Тест `minikube`
  ```console
  00:29:53 ~ sergey@ekbvm:~
  $ kubectl version --short
  Flag --short has been deprecated, and will be removed in the future. The --short output will become the default.
  Client Version: v1.24.1
  Kustomize Version: v4.5.4
  Server Version: v1.23.3
  ```
* Тест `port-forward`, лог `kubectl`
  ```console
  $ kubectl port-forward service/hello-node 8080:8080


  Forwarding from 127.0.0.1:8080 -> 8080
  Forwarding from [::1]:8080 -> 8080
  ^[|Handling connection for 8080
  ```

* Тест `port-forward`, вывод `curl`
  ```console
  00:30:31 ~ sergey@ekbvm:~
  $ curl localhost:8080
  CLIENT VALUES:
  client_address=127.0.0.1
  command=GET
  real path=/
  query=nil
  request_version=1.1
  request_uri=http://localhost:8080/

  SERVER VALUES:
  server_version=nginx: 1.10.0 - lua: 10001

  HEADERS RECEIVED:
  accept=*/*
  host=localhost:8080
  user-agent=curl/7.74.0
  BODY:
  -no body in request-0
  ```
