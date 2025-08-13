// <stdin>
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
import { Phone, MessageSquare, Copy, Check, Send, User, Wrench, DollarSign, Calendar, AlertCircle } from "https://esm.sh/lucide-react?deps=react@18.2.0,react-dom@18.2.0";
function WhatsAppMessageGenerator() {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [messageType, setMessageType] = useState("entrada");
  const [customMessage, setCustomMessage] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  const messageTemplates = {
    entrada: {
      icon: User,
      label: "Entrada de Cliente",
      template: (name) => `Ol\xE1 ${name}! \u{1F44B}

Seja bem-vindo(a) \xE0 TekInform\xE1tica! \u{1F527}\u{1F4BB}

Recebemos seu equipamento e j\xE1 iniciamos a an\xE1lise. Em breve entraremos em contato com o diagn\xF3stico e or\xE7amento.

\u{1F4DE} Telefone: (21) 97628-6027
\u{1F4E7} Email: tekin.formatica@hotmail.com

Obrigado pela confian\xE7a! \u{1F60A}`
    },
    pronto: {
      icon: Wrench,
      label: "Equipamento Pronto",
      template: (name) => `Oi ${name}! \u2705

Temos uma \xF3tima not\xEDcia! Seu equipamento est\xE1 pronto para retirada! \u{1F389}

\u{1F527} Servi\xE7o conclu\xEDdo com sucesso
\u23F0 Dispon\xEDvel para retirada
\u{1F4B0} Valor conforme or\xE7amento aprovado

\u{1F4CD} Aguardamos voc\xEA na TekInform\xE1tica!
\u{1F4DE} (21) 97628-6027

Obrigado! \u{1F60A}`
    },
    cotacao: {
      icon: DollarSign,
      label: "Cota\xE7\xE3o de Pre\xE7o",
      template: (name) => `Ol\xE1 ${name}! \u{1F4CB}

Conclu\xEDmos a an\xE1lise do seu equipamento. Seguem as informa\xE7\xF5es:

\u{1F50D} Diagn\xF3stico realizado
\u{1F4B0} Or\xE7amento em anexo
\u23F1\uFE0F Prazo de execu\xE7\xE3o: X dias \xFAteis

\u2705 Aprove o or\xE7amento para iniciarmos o reparo
\u274C Caso n\xE3o aprovado, taxa de diagn\xF3stico: R$ XX

\u{1F4DE} D\xFAvidas? (21) 97628-6027

Aguardamos retorno! \u{1F60A}`
    },
    agendamento: {
      icon: Calendar,
      label: "Agendamento de Visita",
      template: (name) => `Ol\xE1 ${name}! \u{1F4C5}

Vamos agendar sua visita t\xE9cnica!

\u{1F3E0} Atendimento domiciliar dispon\xEDvel
\u23F0 Hor\xE1rios flex\xEDveis
\u{1F527} T\xE9cnicos especializados

\u{1F4DE} Entre em contato: (21) 97628-6027
\u{1F4E7} Email: tekin.formatica@hotmail.com

Aguardamos seu contato! \u{1F60A}`
    },
    followup: {
      icon: AlertCircle,
      label: "Follow-up",
      template: (name) => `Oi ${name}! \u{1F44B}

Como est\xE1 seu equipamento ap\xF3s nosso atendimento?

\u{1F60A} Tudo funcionando bem?
\u{1F914} Alguma d\xFAvida ou problema?
\u2B50 Que tal avaliar nosso servi\xE7o?

\u{1F4DE} Estamos sempre \xE0 disposi\xE7\xE3o: (21) 97628-6027

TekInform\xE1tica - Solu\xE7\xF5es tecnol\xF3gicas para seu neg\xF3cio! \u{1F4BB}\u{1F527}`
    },
    personalizada: {
      icon: MessageSquare,
      label: "Mensagem Personalizada",
      template: () => customMessage
    }
  };
  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  };
  const validateForm = () => {
    const newErrors = {};
    if (!clientName.trim()) {
      newErrors.clientName = "Nome \xE9 obrigat\xF3rio";
    }
    if (!clientPhone.trim()) {
      newErrors.clientPhone = "Telefone \xE9 obrigat\xF3rio";
    } else if (clientPhone.replace(/\D/g, "").length < 10) {
      newErrors.clientPhone = "Telefone deve ter pelo menos 10 d\xEDgitos";
    }
    if (messageType === "personalizada" && !customMessage.trim()) {
      newErrors.customMessage = "Mensagem personalizada \xE9 obrigat\xF3ria";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const generateMessage = () => {
    if (!validateForm()) return;
    const template = messageTemplates[messageType].template;
    const message = template(clientName.trim());
    setGeneratedMessage(message);
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };
  const sendWhatsApp = async () => {
    if (!validateForm()) return;
    const template = messageTemplates[messageType].template;
    const message = template(clientName.trim());
    const phone = clientPhone.replace(/\D/g, "");
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3e3);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
    const url = `https://wa.me/55${phone}`;
    window.open(url, "_blank");
  };
  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setClientPhone(formatted);
  };
  useEffect(() => {
    if (clientName && messageType !== "personalizada") {
      generateMessage();
    }
  }, [clientName, messageType, customMessage]);
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-900 text-white p-6" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3" }, /* @__PURE__ */ React.createElement(MessageSquare, { size: 24 })), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-green-400" }, "TEKINFORM\xC1TICA")), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 mb-2" }, "Solu\xE7\xF5es tecnol\xF3gicas para seu neg\xF3cio"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center space-x-6 text-sm text-gray-400" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement(Phone, { size: 16, className: "mr-2" }), /* @__PURE__ */ React.createElement("span", null, "(21) 97628-6027")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("span", null, "\u{1F4E7} tekin.formatica@hotmail.com")))), /* @__PURE__ */ React.createElement("div", { className: "grid lg:grid-cols-2 gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold mb-6 text-green-400" }, "Gerador de Mensagens WhatsApp"), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Nome do Cliente"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: clientName,
      onChange: (e) => setClientName(e.target.value),
      placeholder: "Digite o nome do cliente...",
      className: `w-full px-4 py-3 bg-gray-700 rounded-lg border ${errors.clientName ? "border-red-500" : "border-gray-600"} focus:border-green-500 focus:outline-none transition-colors`
    }
  ), errors.clientName && /* @__PURE__ */ React.createElement("p", { className: "text-red-500 text-sm mt-1" }, errors.clientName)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Telefone do Cliente"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: clientPhone,
      onChange: handlePhoneChange,
      placeholder: "(21) 99999-9999",
      maxLength: 15,
      className: `w-full px-4 py-3 bg-gray-700 rounded-lg border ${errors.clientPhone ? "border-red-500" : "border-gray-600"} focus:border-green-500 focus:outline-none transition-colors`
    }
  ), errors.clientPhone && /* @__PURE__ */ React.createElement("p", { className: "text-red-500 text-sm mt-1" }, errors.clientPhone)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-4" }, "Selecione o Tipo de Mensagem"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, Object.entries(messageTemplates).map(([key, template]) => {
    const IconComponent = template.icon;
    return /* @__PURE__ */ React.createElement("label", { key, className: "flex items-center space-x-3 cursor-pointer group" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "radio",
        name: "messageType",
        value: key,
        checked: messageType === key,
        onChange: (e) => setMessageType(e.target.value),
        className: "w-4 h-4 text-green-500"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(IconComponent, { size: 18, className: "text-green-400" }), /* @__PURE__ */ React.createElement("span", { className: "group-hover:text-green-400 transition-colors" }, template.label)));
  }))), messageType === "personalizada" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Mensagem Personalizada"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: customMessage,
      onChange: (e) => setCustomMessage(e.target.value),
      placeholder: "Digite sua mensagem personalizada...",
      rows: 4,
      className: `w-full px-4 py-3 bg-gray-700 rounded-lg border ${errors.customMessage ? "border-red-500" : "border-gray-600"} focus:border-green-500 focus:outline-none transition-colors resize-none`
    }
  ), errors.customMessage && /* @__PURE__ */ React.createElement("p", { className: "text-red-500 text-sm mt-1" }, errors.customMessage)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: generateMessage,
      className: "w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
    },
    /* @__PURE__ */ React.createElement(MessageSquare, { size: 20 }),
    /* @__PURE__ */ React.createElement("span", null, "Gerar Mensagem")
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold mb-4 text-green-400" }, "Pr\xE9-visualiza\xE7\xE3o"), generatedMessage ? /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-900 rounded-lg p-4 border-l-4 border-green-500" }, /* @__PURE__ */ React.createElement("div", { className: "bg-green-600 text-white p-3 rounded-lg text-sm whitespace-pre-wrap" }, generatedMessage), /* @__PURE__ */ React.createElement("div", { className: "text-right text-xs text-gray-400 mt-2" }, (/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: sendWhatsApp,
      disabled: !clientPhone.replace(/\D/g, "").length,
      className: "w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
    },
    /* @__PURE__ */ React.createElement(Send, { size: 18 }),
    /* @__PURE__ */ React.createElement("span", null, "Copiar & Abrir WhatsApp")
  ))) : /* @__PURE__ */ React.createElement("div", { className: "text-center text-gray-500 py-12" }, /* @__PURE__ */ React.createElement(MessageSquare, { size: 48, className: "mx-auto mb-4 opacity-50" }), /* @__PURE__ */ React.createElement("p", null, "Preencha os campos para visualizar a mensagem")))), /* @__PURE__ */ React.createElement("div", { className: "text-center text-gray-500 text-sm mt-8" }, /* @__PURE__ */ React.createElement("p", null, "\xA9 2024 TEKINFORM\xC1TICA. Todos os direitos reservados."))));
}
export {
  WhatsAppMessageGenerator as default
};
