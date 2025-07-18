#!/bin/bash
set -euo pipefail; IFS=$'\n\t'
iptables -F; iptables -X; iptables -t nat -F; iptables -t nat -X; iptables -t mangle -F; iptables -t mangle -X
ipset destroy allowed-domains 2>/dev/null || true
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT; iptables -A INPUT -p udp --sport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 22 -j ACCEPT; iptables -A INPUT -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT; iptables -A OUTPUT -o lo -j ACCEPT
ipset create allowed-domains hash:net
gh_ranges=$(curl -s https://api.github.com/meta); if [ -n "$gh_ranges" ] && echo "$gh_ranges" | jq -e '.web' >/dev/null; then while read -r cidr; do ipset add allowed-domains "$cidr"; done < <(echo "$gh_ranges" | jq -r '(.web + .api + .git)[]' | aggregate -q); fi
for domain in registry.npmjs.org api.anthropic.com sentry.io statsig.anthropic.com statsig.com; do ips=$(dig +short A "$domain"); if [ -n "$ips" ]; then while read -r ip; do ipset add allowed-domains "$ip"; done < <(echo "$ips"); fi; done
HOST_IP=$(ip route | grep default | cut -d" " -f3); if [ -n "$HOST_IP" ]; then HOST_NETWORK=$(echo "$HOST_IP" | sed "s/\.[0-9]*$/.0\/24/"); iptables -A INPUT -s "$HOST_NETWORK" -j ACCEPT; iptables -A OUTPUT -d "$HOST_NETWORK" -j ACCEPT; fi
iptables -P INPUT DROP; iptables -P FORWARD DROP; iptables -P OUTPUT DROP
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT; iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m set --match-set allowed-domains dst -j ACCEPT
echo "✅ Firewall configuration complete."
