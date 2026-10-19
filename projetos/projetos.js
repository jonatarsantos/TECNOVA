document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-abas]").forEach((grupo) => {
      const botoes = [...grupo.querySelectorAll(".aba")];
      const conteudos = [...grupo.querySelectorAll(".conteudo-aba")];
  
      botoes.forEach((botao, indice) => {
        botao.addEventListener("click", () => {
          botoes.forEach((item, i) => {
            const selecionado = i === indice;
            item.setAttribute("aria-selected", String(selecionado));
            item.tabIndex = selecionado ? 0 : -1;
          });
  
          conteudos.forEach((conteudo, i) => {
            conteudo.hidden = i !== indice;
          });
        });
  
        botao.addEventListener("keydown", (evento) => {
          if (!["ArrowRight", "ArrowLeft"].includes(evento.key)) return;
  
          evento.preventDefault();
          const direcao = evento.key === "ArrowRight" ? 1 : -1;
          const proximo = (indice + direcao + botoes.length) % botoes.length;
  
          botoes[proximo].focus();
          botoes[proximo].click();
        });
      });
    });
  
    document.querySelectorAll("[data-copiar]").forEach((botao) => {
      botao.addEventListener("click", async () => {
        const codigo = document.getElementById(botao.dataset.copiar);
        if (!codigo) return;
  
        try {
          await navigator.clipboard.writeText(codigo.innerText);
          botao.textContent = "Código copiado!";
        } catch {
          botao.textContent = "Selecione e copie o código";
        }
  
        setTimeout(() => {
          botao.textContent = "Copiar código";
        }, 2200);
      });
    });
  
    // Simulador do controle de acesso
    const acessoStatus = document.getElementById("acesso-status");
    const acessoMensagem = document.getElementById("acesso-mensagem");
  
    document.querySelectorAll("[data-acesso]").forEach((botao) => {
      botao.addEventListener("click", () => {
        const autorizado = botao.dataset.acesso === "permitir";
  
        if (acessoStatus) {
          acessoStatus.textContent = autorizado
            ? "Cartão autorizado"
            : "Cartão não autorizado";
          acessoStatus.classList.toggle("ativo", autorizado);
        }
  
        if (acessoMensagem) {
          acessoMensagem.textContent = autorizado
            ? "Acesso liberado na simulação. Um sistema real deve validar o cartão no leitor RFID."
            : "Acesso negado na simulação. O sistema real deve manter a fechadura bloqueada.";
        }
      });
    });
  
    // Simulador de irrigação
    const umidade = document.getElementById("umidade");
    const umidadeValor = document.getElementById("umidade-valor");
    const irrigacaoStatus = document.getElementById("irrigacao-status");
    const irrigacaoMensagem = document.getElementById("irrigacao-mensagem");
    const irrigacaoBarra = document.getElementById("irrigacao-barra");
  
    if (umidade) {
      const atualizarUmidade = () => {
        const valor = Number(umidade.value);
        umidadeValor.textContent = `${valor}%`;
        irrigacaoBarra.style.width = `${valor}%`;
  
        const precisaAgua = valor < 35;
        irrigacaoStatus.textContent = precisaAgua
          ? "Irrigação necessária"
          : "Umidade suficiente";
        irrigacaoStatus.classList.toggle("ativo", !precisaAgua);
  
        irrigacaoMensagem.textContent = precisaAgua
          ? "O solo está seco na simulação. O controlador acionaria a bomba de água."
          : "A umidade está adequada na simulação. A bomba deve permanecer desligada.";
      };
  
      umidade.addEventListener("input", atualizarUmidade);
      atualizarUmidade();
    }
  
    // Simulador do sensor MQ-2
    const gasSlider = document.getElementById("gas-nivel");
    const gasValor = document.getElementById("gas-valor");
    const gasStatus = document.getElementById("gas-status");
    const gasMensagem = document.getElementById("gas-mensagem");
  
    if (gasSlider) {
      const atualizarGas = () => {
        const valor = Number(gasSlider.value);
        gasValor.textContent = `${valor}%`;
  
        if (valor < 35) {
          gasStatus.textContent = "Nível baixo na simulação";
          gasStatus.classList.remove("ativo");
          gasMensagem.textContent =
            "O nível ilustrativo está abaixo do limite escolhido para esta demonstração.";
        } else if (valor < 65) {
          gasStatus.textContent = "Atenção na simulação";
          gasStatus.classList.add("ativo");
          gasMensagem.textContent =
            "O valor ilustrativo chegou à faixa de alerta. Um sistema real precisaria de calibração e validação.";
        } else {
          gasStatus.textContent = "Alerta elevado na simulação";
          gasStatus.classList.add("ativo");
          gasMensagem.textContent =
            "A simulação indica nível elevado. Em um sistema real, siga o plano de emergência e não dependa apenas deste protótipo.";
        }
      };
  
      gasSlider.addEventListener("input", atualizarGas);
      atualizarGas();
    }
  
    document.querySelectorAll("[data-ano]").forEach((elemento) => {
      elemento.textContent = new Date().getFullYear();
    });
  });