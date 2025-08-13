import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Copy, Check, Send, User, Wrench, DollarSign, Calendar, AlertCircle } from 'lucide-react';

export default function WhatsAppMessageGenerator() {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [messageType, setMessageType] = useState('entrada');
  const [customMessage, setCustomMessage] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const messageTemplates = {
    entrada: {
      icon: User,
      label: 'Entrada de Cliente',
      template: (name) => `Olá ${name}! 👋\n\nSeja bem-vindo(a) à TekInformática! 🔧💻\n\nRecebemos seu equipamento e já iniciamos a análise. Em breve entraremos em contato com o diagnóstico e orçamento.\n\n📞 Telefone: (21) 97628-6027\n📧 Email: tekin.formatica@hotmail.com\n\nObrigado pela confiança! 😊`
    },
    pronto: {
      icon: Wrench,
      label: 'Equipamento Pronto',
      template: (name) => `Oi ${name}! ✅\n\nTemos uma ótima notícia! Seu equipamento está pronto para retirada! 🎉\n\n🔧 Serviço concluído com sucesso\n⏰ Disponível para retirada\n💰 Valor conforme orçamento aprovado\n\n📍 Aguardamos você na TekInformática!\n📞 (21) 97628-6027\n\nObrigado! 😊`
    },
    cotacao: {
      icon: DollarSign,
      label: 'Cotação de Preço',
      template: (name) => `Olá ${name}! 📋\n\nConcluímos a análise do seu equipamento. Seguem as informações:\n\n🔍 Diagnóstico realizado\n💰 Orçamento em anexo\n⏱️ Prazo de execução: X dias úteis\n\n✅ Aprove o orçamento para iniciarmos o reparo\n❌ Caso não aprovado, taxa de diagnóstico: R$ XX\n\n📞 Dúvidas? (21) 97628-6027\n\nAguardamos retorno! 😊`
    },
    agendamento: {
      icon: Calendar,
      label: 'Agendamento de Visita',
      template: (name) => `Olá ${name}! 📅\n\nVamos agendar sua visita técnica!\n\n🏠 Atendimento domiciliar disponível\n⏰ Horários flexíveis\n🔧 Técnicos especializados\n\n📞 Entre em contato: (21) 97628-6027\n📧 Email: tekin.formatica@hotmail.com\n\nAguardamos seu contato! 😊`
    },
    followup: {
      icon: AlertCircle,
      label: 'Follow-up',
      template: (name) => `Oi ${name}! 👋\n\nComo está seu equipamento após nosso atendimento?\n\n😊 Tudo funcionando bem?\n🤔 Alguma dúvida ou problema?\n⭐ Que tal avaliar nosso serviço?\n\n📞 Estamos sempre à disposição: (21) 97628-6027\n\nTekInformática - Soluções tecnológicas para seu negócio! 💻🔧`
    },
    personalizada: {
      icon: MessageSquare,
      label: 'Mensagem Personalizada',
      template: () => customMessage
    }
  };

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!clientName.trim()) {
      newErrors.clientName = 'Nome é obrigatório';
    }
    
    if (!clientPhone.trim()) {
      newErrors.clientPhone = 'Telefone é obrigatório';
    } else if (clientPhone.replace(/\D/g, '').length < 10) {
      newErrors.clientPhone = 'Telefone deve ter pelo menos 10 dígitos';
    }
    
    if (messageType === 'personalizada' && !customMessage.trim()) {
      newErrors.customMessage = 'Mensagem personalizada é obrigatória';
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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const sendWhatsApp = async () => {
    // Valida o formulário
    if (!validateForm()) return;
    
    // Gera a mensagem na hora
    const template = messageTemplates[messageType].template;
    const message = template(clientName.trim());
    
    const phone = clientPhone.replace(/\D/g, '');
    
    // Copia a mensagem automaticamente com todos os emojis
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
    
    // Abre WhatsApp apenas com o número, sem texto na URL
    const url = `https://wa.me/55${phone}`;
    window.open(url, '_blank');
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setClientPhone(formatted);
  };

  useEffect(() => {
    if (clientName && messageType !== 'personalizada') {
      generateMessage();
    }
  }, [clientName, messageType, customMessage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <MessageSquare size={24} />
            </div>
            <h1 className="text-3xl font-bold text-green-400">TEKINFORMÁTICA</h1>
          </div>
          <p className="text-gray-400 mb-2">Soluções tecnológicas para seu negócio</p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>(21) 97628-6027</span>
            </div>
            <div className="flex items-center">
              <span>📧 tekin.formatica@hotmail.com</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-green-400">Gerador de Mensagens WhatsApp</h2>
            
            <div className="space-y-6">
              {/* Nome do Cliente */}
              <div>
                <label className="block text-sm font-medium mb-2">Nome do Cliente</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Digite o nome do cliente..."
                  className={`w-full px-4 py-3 bg-gray-700 rounded-lg border ${
                    errors.clientName ? 'border-red-500' : 'border-gray-600'
                  } focus:border-green-500 focus:outline-none transition-colors`}
                />
                {errors.clientName && (
                  <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
                )}
              </div>

              {/* Telefone do Cliente */}
              <div>
                <label className="block text-sm font-medium mb-2">Telefone do Cliente</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={handlePhoneChange}
                  placeholder="(21) 99999-9999"
                  maxLength={15}
                  className={`w-full px-4 py-3 bg-gray-700 rounded-lg border ${
                    errors.clientPhone ? 'border-red-500' : 'border-gray-600'
                  } focus:border-green-500 focus:outline-none transition-colors`}
                />
                {errors.clientPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
                )}
              </div>

              {/* Tipo de Mensagem */}
              <div>
                <label className="block text-sm font-medium mb-4">Selecione o Tipo de Mensagem</label>
                <div className="space-y-3">
                  {Object.entries(messageTemplates).map(([key, template]) => {
                    const IconComponent = template.icon;
                    return (
                      <label key={key} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="messageType"
                          value={key}
                          checked={messageType === key}
                          onChange={(e) => setMessageType(e.target.value)}
                          className="w-4 h-4 text-green-500"
                        />
                        <div className="flex items-center space-x-2">
                          <IconComponent size={18} className="text-green-400" />
                          <span className="group-hover:text-green-400 transition-colors">
                            {template.label}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Mensagem Personalizada */}
              {messageType === 'personalizada' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem Personalizada</label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Digite sua mensagem personalizada..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-700 rounded-lg border ${
                      errors.customMessage ? 'border-red-500' : 'border-gray-600'
                    } focus:border-green-500 focus:outline-none transition-colors resize-none`}
                  />
                  {errors.customMessage && (
                    <p className="text-red-500 text-sm mt-1">{errors.customMessage}</p>
                  )}
                </div>
              )}

              {/* Botão Gerar */}
              <button
                onClick={generateMessage}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Gerar Mensagem</span>
              </button>
            </div>
          </div>

          {/* Preview e Ações */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">Pré-visualização</h3>
            
            {generatedMessage ? (
              <div className="space-y-4">
                {/* Preview da mensagem */}
                <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                  <div className="bg-green-600 text-white p-3 rounded-lg text-sm whitespace-pre-wrap">
                    {generatedMessage}
                  </div>
                  <div className="text-right text-xs text-gray-400 mt-2">
                    {new Date().toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>

                {/* Botão de ação */}
                <div className="flex justify-center">
                  <button
                    onClick={sendWhatsApp}
                    disabled={!clientPhone.replace(/\D/g, '').length}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send size={18} />
                    <span>Copiar & Abrir WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Preencha os campos para visualizar a mensagem</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>&copy; 2024 TEKINFORMÁTICA. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}