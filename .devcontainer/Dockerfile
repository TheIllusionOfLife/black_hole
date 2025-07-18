FROM node:20

ARG TZ
ENV TZ="$TZ"

RUN apt update && apt install -y less git procps sudo fzf zsh man-db unzip gnupg2 gh iptables ipset iproute2 dnsutils aggregate jq rsync

RUN mkdir -p /usr/local/share/npm-global && chown -R node:node /usr/local/share
ARG USERNAME=node
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" && mkdir /commandhistory && touch /commandhistory/.bash_history && chown -R $USERNAME /commandhistory
ENV DEVCONTAINER=true
RUN mkdir -p /workspace /home/node/.claude /home/node/.claude-backup && chown -R node:node /workspace /home/node/.claude /home/node/.claude-backup
WORKDIR /workspace
USER node
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin
ENV SHELL=/bin/zsh
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.0/zsh-in-docker.sh)" -- -p git -p fzf -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" -a "source /usr/share/doc/fzf/examples/completion.zsh" -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" -x
RUN npm install -g @anthropic-ai/claude-code
COPY init-firewall.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/init-firewall.sh && echo "node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/node-firewall && chmod 0440 /etc/sudoers.d/node-firewall
USER node
