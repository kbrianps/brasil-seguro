window.BS_RISKS = {
  calor: {
    nome: "Calor extremo",
    cor: "#EA580C",
    icone: "🌡️",
    nivel: "Nível 4 de 5",
    alerta: {
      titulo: "Onda de calor: até 41 °C",
      texto: "Calor extremo previsto por 3 dias ou mais na sua região. Risco alto para idosos, crianças e quem trabalha na rua.",
      hora: "Hoje, 09:12"
    },
    passos: [
      ["Beba água a cada 20 minutos", "Mesmo sem sede. Idosos sentem menos sede no calor."],
      ["Fique longe do sol das 10h às 16h", "Se precisar sair, use chapéu e roupa clara."],
      ["Vá para um ponto de resfriamento", "O mais perto de você está a 600 m."]
    ],
    locais: [
      ["Ponto de resfriamento", "Biblioteca do bairro", "600 m", 35, "Ar-condicionado e água · até 20h"],
      ["Ponto de água", "Praça da estação", "850 m", 0, "Bebedouro e sombra · 24h"],
      ["Ponto de resfriamento", "Escola municipal", "1,2 km", 72, "Ar-condicionado · até 18h"],
      ["Unidade de saúde", "Clínica da família", "1,4 km", 55, "Atendimento por insolação"]
    ],
    rumor: ["Áudio no WhatsApp: \"vão cortar a água do bairro amanhã\"", "Não existe aviso oficial de corte de água para o seu bairro."],
    rede: ["Dona Maria, 78", "mora sozinha · vizinha", "Sem resposta há 40 min", "Carlos (voluntário) foi avisado e está indo até lá."],
    antes: ["Cadastre quem mora sozinho perto de você", "Tenha garrafas de água e um ventilador funcionando", "Salve os pontos de resfriamento do bairro"],
    durante: ["Hidrate-se e evite o sol das 10h às 16h", "Molhe panos e coloque na nuca e nos pulsos", "Confusão, pele quente e seca: ligue 192"],
    depois: ["Confira se idosos da rede estão bem", "Registre falta de água ou luz no app", "Veja seus direitos se perdeu renda ou alimentos"],
    direitos: ["Pausas e água para quem trabalha ao ar livre", "Registro de falta de luz ou água para cobrar a concessionária", "Atendimento gratuito no SUS por insolação"]
  },
  enchente: {
    nome: "Chuva extrema e enchente",
    cor: "#2563EB",
    icone: "🌊",
    nivel: "Risco muito alto",
    alerta: {
      titulo: "Rio pode transbordar em 6 horas",
      texto: "Chuva forte e contínua na bacia. Áreas baixas do seu bairro podem alagar. Prepare a saída.",
      hora: "Hoje, 05:40"
    },
    passos: [
      ["Pegue a mochila de emergência", "Documentos, remédios, carregador e água."],
      ["Desligue a energia e o gás", "Antes de a água entrar em casa."],
      ["Siga a rota segura até o abrigo", "Evite a avenida beira-rio: já há relatos de alagamento."]
    ],
    locais: [
      ["Abrigo", "Ginásio poliesportivo", "900 m", 62, "Aceita pets · 140 vagas livres"],
      ["Abrigo", "Escola estadual", "1,5 km", 91, "Quase lotado · 18 vagas"],
      ["Ponto de resgate", "Igreja matriz (área alta)", "700 m", 0, "Barcos de resgate partem daqui"],
      ["Doações", "Centro comunitário", "1,1 km", 0, "Precisa de água, colchões e ração"]
    ],
    rumor: ["Mensagem: \"cadastro obrigatório no abrigo ou perde o auxílio\"", "Não existe cadastro obrigatório. O cadastro é feito pela prefeitura, sem prazo."],
    rede: ["Seu Antônio, 81", "cadeirante · rua de baixo", "Pediu ajuda há 12 min", "Equipe de resgate notificada · 2 vizinhos a caminho."],
    antes: ["Monte a mochila de emergência", "Saiba se sua rua fica em área de alagamento", "Combine com a família um ponto de encontro"],
    durante: ["Saia cedo, não espere a água subir", "Nunca atravesse água corrente a pé ou de carro", "Leve os pets e avise sua rede"],
    depois: ["Só volte para casa com liberação da Defesa Civil", "Fotografe os danos para pedir auxílio", "Cuidado com água parada: leptospirose e dengue"],
    direitos: ["Saque do FGTS por calamidade", "Auxílio para famílias desalojadas", "Segunda via de documentos sem custo"]
  },
  seca: {
    nome: "Seca severa",
    cor: "#B45309",
    icone: "🏜️",
    nivel: "Seca extrema",
    alerta: {
      titulo: "Seca extrema no seu município",
      texto: "Sem chuva significativa há 70 dias. Reservatórios abaixo de 15%. Racionamento possível.",
      hora: "Hoje, 07:00"
    },
    passos: [
      ["Veja quando chega o carro-pipa", "Próxima entrega na sua comunidade: quinta-feira."],
      ["Guarde água com segurança", "Recipiente fechado e limpo. Trate com hipoclorito."],
      ["Veja se tem direito ao Garantia-Safra", "Perda de safra acima de 50% dá direito ao benefício."]
    ],
    locais: [
      ["Carro-pipa", "Comunidade Lagoa Seca", "3 km", 0, "Chegou ontem · confirmado por líder local"],
      ["Ponto de água", "Cisterna comunitária", "1,8 km", 40, "Água potável · 8h às 17h"],
      ["Atendimento", "Sindicato rural", "12 km", 0, "Ajuda com Garantia-Safra e Proagro"],
      ["Unidade de saúde", "Posto de saúde", "6 km", 30, "Atendimento por desidratação"]
    ],
    rumor: ["Áudio: \"o governo acabou com a Operação Carro-Pipa\"", "Falso. A operação continua ativa. Veja a próxima entrega no app."],
    rede: ["Comunidade Sítio Velho", "12 famílias · líder: Dona Rita", "Carro-pipa não chegou há 9 dias", "Pedido registrado e enviado à Defesa Civil estadual."],
    antes: ["Cadastre sua comunidade para o carro-pipa", "Limpe a cisterna antes da estiagem", "Consulte o calendário de plantio da sua região"],
    durante: ["Priorize água para beber e cozinhar", "Informe quando o carro-pipa não chegar", "Proteja os animais com sombra e água"],
    depois: ["Peça o Garantia-Safra se perdeu a lavoura", "Renegocie dívidas rurais por estiagem", "Registre perdas para o decreto de emergência"],
    direitos: ["Garantia-Safra para agricultor familiar", "Prorrogação de crédito rural por estiagem", "Operação Carro-Pipa para comunidades rurais"]
  },
  rios: {
    nome: "Seca dos rios",
    cor: "#0D9488",
    icone: "🛶",
    nivel: "Isolamento",
    alerta: {
      titulo: "Rio em nível crítico",
      texto: "O rio baixou 40 cm em 7 dias. Trechos de navegação podem fechar e isolar comunidades.",
      hora: "Hoje, 06:30"
    },
    passos: [
      ["Antecipe compras e remédios", "O barco pode não passar na próxima semana."],
      ["Não beba água do rio sem tratar", "Com o rio baixo, o risco de diarreia aumenta."],
      ["Avise a comunidade", "Funciona sem internet: o alerta passa de celular em celular."]
    ],
    locais: [
      ["Ponto de água", "Poço da comunidade", "400 m", 0, "Água tratada · confirmado hoje"],
      ["Embarque", "Porto alternativo", "5 km", 0, "Barcos pequenos ainda passam"],
      ["Unidade de saúde", "Posto fluvial", "18 km", 20, "Visita a cada 15 dias"],
      ["Doações", "Associação de moradores", "800 m", 0, "Recebe água mineral e cestas"]
    ],
    rumor: ["Mensagem: \"o rio vai secar por completo em 3 dias\"", "Não há previsão oficial assim. Veja o nível real medido hoje."],
    rede: ["Comunidade São Raimundo", "38 famílias · ribeirinhos", "Sem barco há 6 dias", "Pedido de água e mantimentos enviado à Defesa Civil."],
    antes: ["Estoque água tratada e alimentos", "Combine rotas alternativas com a comunidade", "Baixe guias e mapa para usar sem internet"],
    durante: ["Trate toda água com hipoclorito", "Atenção à fumaça de queimadas", "Use o pedido de ajuda offline"],
    depois: ["Registre perdas de roçado e pesca", "Peça o seguro-defeso se aplicável", "Ajude a atualizar o mapa de navegação"],
    direitos: ["Seguro-defeso para pescador artesanal", "Ajuda humanitária em situação de emergência", "Atendimento de saúde fluvial"]
  },
  fumaca: {
    nome: "Calor, seca e queimadas",
    cor: "#DC2626",
    icone: "🔥",
    nivel: "Ar muito ruim",
    alerta: {
      titulo: "Fumaça de queimadas e 39 °C",
      texto: "Umidade do ar abaixo de 15% e fumaça de incêndios próximos. Evite atividades ao ar livre.",
      hora: "Hoje, 10:05"
    },
    passos: [
      ["Feche portas e janelas", "Use pano úmido nas frestas para segurar a fumaça."],
      ["Use máscara se precisar sair", "PFF2 protege melhor contra fumaça."],
      ["Viu fogo? Reporte agora", "Foto e localização vão direto para os brigadistas."]
    ],
    locais: [
      ["Ponto de resfriamento", "Centro cultural", "1 km", 30, "Ar filtrado · até 21h"],
      ["Ponto de água", "Parque municipal", "1,3 km", 0, "Bebedouros funcionando"],
      ["Unidade de saúde", "UPA", "2,1 km", 68, "Atendimento respiratório"],
      ["Brigada", "Base de brigadistas", "8 km", 0, "Recebe relatos de foco de incêndio"]
    ],
    rumor: ["Post: \"incêndio chegou ao centro da cidade\"", "Falso. Os focos estão a 25 km, na zona rural."],
    rede: ["Seu Joaquim, 84", "asmático · prédio vizinho", "Respondeu: \"falta ar\"", "SAMU acionado · vizinha Paula está com ele."],
    antes: ["Tenha máscaras PFF2 em casa", "Saiba onde fica a UPA mais próxima", "Cadastre quem tem doença respiratória"],
    durante: ["Fique em ambiente fechado e úmido", "Beba muita água", "Reporte focos de incêndio com foto"],
    depois: ["Limpe a poeira com pano úmido", "Procure atendimento se a tosse continuar", "Registre perdas para auxílio"],
    direitos: ["Atendimento gratuito no SUS", "Ajuda humanitária em emergência", "Auxílio a produtores rurais atingidos"]
  },
  deslizamento: {
    nome: "Chuva forte e risco de deslizamento",
    cor: "#7C3AED",
    icone: "⛰️",
    nivel: "Risco alto",
    alerta: {
      titulo: "Chuva forte nas próximas horas",
      texto: "O solo do morro já está encharcado. Se você mora em encosta, saia com calma para o ponto de apoio antes de escurecer.",
      hora: "Hoje, 16:20"
    },
    passos: [
      ["Saia com calma para o ponto de apoio", "O mais perto fica a 300 m, descendo pela escadaria principal."],
      ["Leve só o essencial", "Documentos, remédios e carregador."],
      ["Toque em Estou bem quando chegar", "Sua família recebe o aviso na hora."]
    ],
    locais: [
      ["Ponto de apoio", "Escola municipal (parte baixa)", "300 m", 45, "Aberto agora · aceita pets"],
      ["Ponto de apoio", "Associação de moradores", "550 m", 70, "Aberto agora"],
      ["Unidade de saúde", "Clínica da família", "800 m", 30, "Funcionando"],
      ["Doações", "Igreja da rua principal", "650 m", 0, "Precisa de colchões e água"]
    ],
    rumor: ["Áudio: \"o morro todo vai desabar hoje\"", "Não há aviso oficial assim. O alerta real pede saída preventiva só das áreas de encosta marcadas."],
    rede: ["Seu Antônio, 81", "cadeirante · beco de cima", "Ainda não saiu de casa", "Dois vizinhos voluntários estão indo ajudar."],
    antes: ["Veja se sua casa fica em área de encosta", "Conheça o caminho até o ponto de apoio", "Observe rachaduras, portas emperrando e água barrenta"],
    durante: ["Saia ao ouvir a sirene ou receber o alerta", "Não volte para buscar objetos", "Ajude quem tem dificuldade para andar"],
    depois: ["Só volte com liberação da Defesa Civil", "Fotografe os danos para pedir auxílio", "Peça vistoria se apareceram rachaduras"],
    direitos: ["Aluguel social para famílias desalojadas", "Saque do FGTS por calamidade", "Vistoria gratuita da Defesa Civil"]
  },
  alagamento: {
    nome: "Chuva forte e alagamento",
    cor: "#2563EB",
    icone: "🌧️",
    nivel: "Atenção",
    alerta: {
      titulo: "Chuva forte à tarde",
      texto: "Pontos de alagamento são esperados nas vias baixas do bairro entre 15h e 19h. Planeje sua volta para casa.",
      hora: "Hoje, 11:30"
    },
    passos: [
      ["Evite as ruas que costumam alagar", "O app mostra os pontos marcados por moradores."],
      ["Não atravesse água na rua", "Nem a pé, nem de carro ou moto."],
      ["Se puder, volte antes das 15h", "Ou espere a chuva passar em local seguro."]
    ],
    locais: [
      ["Ponto de apoio", "Escola municipal", "700 m", 20, "Aberto em caso de alagamento"],
      ["Ponto de alagamento", "Avenida principal, altura do nº 1200", "400 m", 0, "Reportado por 14 moradores"],
      ["Unidade de saúde", "UPA", "1,6 km", 50, "Funcionando"],
      ["Doações", "Centro comunitário", "1 km", 0, "Recebe roupas e água"]
    ],
    rumor: ["Mensagem: \"a barragem do bairro rompeu\"", "Falso. Não existe barragem com risco na sua região."],
    rede: ["Dona Lúcia, 74", "mora sozinha · térreo", "Respondeu: estou bem", "Ela confirmou que vai ficar em casa até a chuva passar."],
    antes: ["Saiba quais ruas do bairro alagam", "Mantenha bueiros da sua rua limpos", "Guarde documentos em saco plástico"],
    durante: ["Fique em local alto e seguro", "Desligue a energia se a água entrar", "Reporte pontos de alagamento com foto"],
    depois: ["Cuidado com água parada: leptospirose", "Limpe a casa com água sanitária", "Registre perdas para pedir auxílio"],
    direitos: ["Saque do FGTS por calamidade", "Auxílio a famílias desalojadas", "Atendimento gratuito no SUS"]
  }
};

window.BS_UFS = {
  AC: ["Acre", "Norte", "rios", "Rio Branco"],
  AL: ["Alagoas", "Nordeste", "seca", "Santana do Ipanema"],
  AP: ["Amapá", "Norte", "rios", "Macapá"],
  AM: ["Amazonas", "Norte", "rios", "Tefé"],
  BA: ["Bahia", "Nordeste", "seca", "Juazeiro"],
  CE: ["Ceará", "Nordeste", "seca", "Quixadá"],
  DF: ["Distrito Federal", "Centro-Oeste", "fumaca", "Brasília"],
  ES: ["Espírito Santo", "Sudeste", "calor", "Vitória"],
  GO: ["Goiás", "Centro-Oeste", "fumaca", "Goiânia"],
  MA: ["Maranhão", "Nordeste", "seca", "Imperatriz"],
  MT: ["Mato Grosso", "Centro-Oeste", "fumaca", "Cuiabá"],
  MS: ["Mato Grosso do Sul", "Centro-Oeste", "fumaca", "Corumbá"],
  MG: ["Minas Gerais", "Sudeste", "calor", "Belo Horizonte"],
  PA: ["Pará", "Norte", "rios", "Santarém"],
  PB: ["Paraíba", "Nordeste", "seca", "Patos"],
  PR: ["Paraná", "Sul", "enchente", "União da Vitória"],
  PE: ["Pernambuco", "Nordeste", "seca", "Petrolina"],
  PI: ["Piauí", "Nordeste", "seca", "Picos"],
  RJ: ["Rio de Janeiro", "Sudeste", "calor", "Madureira, Rio de Janeiro"],
  RN: ["Rio Grande do Norte", "Nordeste", "seca", "Caicó"],
  RS: ["Rio Grande do Sul", "Sul", "enchente", "Canoas"],
  RO: ["Rondônia", "Norte", "rios", "Porto Velho"],
  RR: ["Roraima", "Norte", "rios", "Boa Vista"],
  SC: ["Santa Catarina", "Sul", "enchente", "Blumenau"],
  SP: ["São Paulo", "Sudeste", "calor", "Itaquera, São Paulo"],
  SE: ["Sergipe", "Nordeste", "seca", "Nossa Senhora da Glória"],
  TO: ["Tocantins", "Norte", "fumaca", "Palmas"]
};

window.BS_REGIOES = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

window.BS_LOCAIS = {
  RJ: {
    "madureira": ["Madureira", "calor"],
    "urca": ["Urca", "calor"],
    "complexo-do-alemao": ["Complexo do Alemão", "deslizamento"],
    "rocinha": ["Rocinha", "deslizamento"],
    "jacarepagua": ["Jacarepaguá", "alagamento"],
    "copacabana": ["Copacabana", "calor"],
    "campo-grande": ["Campo Grande", "calor"],
    "petropolis": ["Petrópolis", "deslizamento"]
  },
  SP: {
    "itaquera": ["Itaquera", "calor"],
    "paraisopolis": ["Paraisópolis", "calor"],
    "jardim-pantanal": ["Jardim Pantanal", "alagamento"]
  },
  RS: {
    "canoas": ["Canoas", "enchente"],
    "porto-alegre": ["Porto Alegre", "enchente"]
  }
};

window.BS_ORDEM = {
  "Norte": ["rios", "fumaca", "calor", "alagamento", "enchente", "seca", "deslizamento"],
  "Nordeste": ["seca", "calor", "alagamento", "enchente", "deslizamento", "fumaca", "rios"],
  "Centro-Oeste": ["fumaca", "calor", "seca", "alagamento", "enchente", "deslizamento", "rios"],
  "Sudeste": ["calor", "deslizamento", "alagamento", "enchente", "seca", "fumaca", "rios"],
  "Sul": ["enchente", "alagamento", "deslizamento", "calor", "seca", "fumaca", "rios"]
};

window.BS_PONTOS = [
  ["AC",-9.97,-67.81],["AL",-9.65,-35.73],["AL",-9.37,-37.25],["AP",0.03,-51.07],["AM",-3.12,-60.02],["AM",-3.35,-64.71],
  ["BA",-12.97,-38.5],["BA",-9.41,-40.5],["BA",-14.86,-40.84],["CE",-3.73,-38.52],["CE",-4.97,-39.02],["CE",-7.21,-39.31],["DF",-15.79,-47.88],
  ["ES",-20.32,-40.34],["GO",-16.68,-49.25],["GO",-14.5,-49],["MA",-2.53,-44.3],["MA",-5.52,-47.47],["MT",-15.6,-56.1],["MT",-11.86,-55.5],
  ["MS",-20.47,-54.62],["MS",-19.01,-57.65],["MG",-19.92,-43.94],["MG",-18.92,-48.28],["MG",-16.73,-43.86],["MG",-21.76,-43.35],
  ["PA",-1.46,-48.49],["PA",-2.44,-54.71],["PA",-5.37,-49.12],["PB",-7.12,-34.86],["PB",-7.02,-37.28],["PR",-25.43,-49.27],["PR",-26.23,-51.09],["PR",-23.31,-51.16],
  ["PE",-8.05,-34.88],["PE",-9.39,-40.5],["PE",-8.28,-35.98],["PI",-5.09,-42.8],["PI",-7.08,-41.47],["RJ",-22.91,-43.17],["RJ",-22.51,-43.18],["RJ",-21.75,-41.32],
  ["RN",-5.79,-35.21],["RN",-6.46,-37.1],["RS",-30.03,-51.23],["RS",-29.92,-51.18],["RS",-29.69,-53.81],["RS",-31.77,-52.34],["RO",-8.76,-63.9],["RR",2.82,-60.67],
  ["SC",-27.59,-48.55],["SC",-26.92,-49.07],["SC",-27.1,-52.61],["SP",-23.55,-46.63],["SP",-22.91,-47.06],["SP",-21.18,-47.81],["SP",-20.81,-49.38],
  ["SE",-10.91,-37.07],["SE",-10.22,-37.42],["TO",-10.18,-48.33],["TO",-7.19,-48.2]
];

window.BS_BAIRROS_GEO = {
  RJ: { "madureira": [-22.873,-43.339], "urca": [-22.949,-43.163], "complexo-do-alemao": [-22.861,-43.271], "rocinha": [-22.988,-43.248], "jacarepagua": [-22.953,-43.363], "copacabana": [-22.971,-43.186], "campo-grande": [-22.902,-43.561], "petropolis": [-22.505,-43.178] },
  SP: { "itaquera": [-23.54,-46.456], "paraisopolis": [-23.613,-46.727], "jardim-pantanal": [-23.495,-46.428] },
  RS: { "canoas": [-29.918,-51.184], "porto-alegre": [-30.034,-51.217] }
};

window.BS_MUNIS = {
  RJ: [["Rio de Janeiro", ["urca", "madureira", "complexo-do-alemao", "rocinha", "jacarepagua", "copacabana", "campo-grande"]], ["Petrópolis", "petropolis"]],
  SP: [["São Paulo", ["itaquera", "paraisopolis", "jardim-pantanal"]]],
  RS: [["Canoas", "canoas"], ["Porto Alegre", "porto-alegre"]]
};

window.BS_CEP = [[1,19999,"SP"],[20000,28999,"RJ"],[29000,29999,"ES"],[30000,39999,"MG"],[40000,48999,"BA"],[49000,49999,"SE"],[50000,56999,"PE"],[57000,57999,"AL"],[58000,58999,"PB"],[59000,59999,"RN"],[60000,63999,"CE"],[64000,64999,"PI"],[65000,65999,"MA"],[66000,68899,"PA"],[68900,68999,"AP"],[69000,69299,"AM"],[69300,69399,"RR"],[69400,69899,"AM"],[69900,69999,"AC"],[70000,72799,"DF"],[72800,76799,"GO"],[76800,76999,"RO"],[77000,77999,"TO"],[78000,78899,"MT"],[79000,79999,"MS"],[80000,87999,"PR"],[88000,89999,"SC"],[90000,99999,"RS"]];
