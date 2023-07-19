# Nginx Ingress on Kubernetes

## Get the installation YAML

The controller ships as a helm chart, so we can grab version v1.7.0 as per the compatibility matrix.

From our container we can do this:

```bash
$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
$ helm search repo ingress-nginx --versions

NAME                            CHART VERSION   APP VERSION     DESCRIPTION
ingress-nginx/ingress-nginx     4.6.0           1.7.0           Ingress controller for Kubernetes using NGINX a...
```

Now we can use helm to install the chart directly if we want.

```bash
$ helm template ingress-nginx ingress-nginx \
--repo https://kubernetes.github.io/ingress-nginx \
--version 4.6.0 \
--namespace ingress-nginx \
> ./kubernetes/ingress/manifests/nginx-ingress.1.7.0.yaml
```

Deploy the Ingress controller

```bash
$ kubectl create namespace ingress-nginx
$ kubectl apply -f ./kubernetes/ingress/manifests/nginx-ingress.1.7.0.yaml
```

Check the installation

```bash
$ kubectl -n ingress-nginx get pods
```

The traffic for our cluster will come in over the Ingress service
Note that we do not have load balancer capability in kind by default, so our LoadBalancer is pending:

```bash
$ kubectl -n ingress-nginx get svc
NAME                                 TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.96.80.16    <pending>     80:32696/TCP,443:30533/TCP   102s
ingress-nginx-controller-admission   ClusterIP      10.96.255.53   <none>        443/TCP                      102s
```

For testing purposes, we will simply setup port-forwarding
When running in the cloud, you will get a real IP address that domains will be pointed to.

```bash
$ sudo kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 443
```

We can reach our controller on https://localhost/

It's important to understand that Ingress runs on two ports 80 and 443
NGINX Ingress creates a fake certificate which is served for default HTTPS traffic on port 443.
If you look in the browser you will notice the name of the certificate Common Name (CN) Kubernetes Ingress Controller Fake Certificate
