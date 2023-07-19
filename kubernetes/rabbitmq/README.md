# RabbitMQ on Kubernetes

NOTE: Always ensure you are connected to the correct Kubernetes server before running any kubectl commands

```bash
$ kubectl config current-context
```

## Namespace

```bash
$ kubectl create ns rabbits
```

## Storage Class

```bash
$ kubectl get storageclass
NAME                 PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
standard (default)   rancher.io/local-path   Delete          WaitForFirstConsumer   false                  56m
```

## Deployment

```bash
$ kubectl create -n rabbits -f ./kubernetes/rabbitmq/rbac.yaml
$ kubectl create -n rabbits -f ./kubernetes/rabbitmq/secret.yaml
$ kubectl create -n rabbits -f ./kubernetes/rabbitmq/configmap.yaml
$ kubectl create -n rabbits -f ./kubernetes/rabbitmq/statefulset.yaml
$ kubectl create -n rabbits -f ./kubernetes/rabbitmq/service.yaml
```

## Access the UI

Check pods and storage are running

```bash
$ kubectl -n rabbits get pods
$ kubectl -n rabbits get pvc
```

Forward the UI port once everything is running

```bash
$ kubectl -n rabbits port-forward rabbitmq-0 8080:15672
```

Go to http://localhost:8080 <br/>
Username: `guest` <br/>
Password: `guest` <br/>

# Automatic Synchronization

https://www.rabbitmq.com/ha.html#unsynchronised-mirrors

Enter a pod

```bash
$ kubectl -n rabbits exec -it rabbitmq-0 bash
```

```bash
$ rabbitmqctl set_policy ha-fed \
    ".*" '{"federation-upstream-set":"all", "ha-sync-mode":"automatic", "ha-mode":"nodes", "ha-params":["rabbit@rabbitmq-0.rabbitmq.rabbits.svc.cluster.local","rabbit@rabbitmq-1.rabbitmq.rabbits.svc.cluster.local","rabbit@rabbitmq-2.rabbitmq.rabbits.svc.cluster.local"]}' \
    --priority 1 \
    --apply-to queues
```
