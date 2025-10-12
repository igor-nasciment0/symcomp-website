
import csv
import re
import random

# Aleatório, mas determinístico
random.seed("00f4f2e84b02e4ba26f6b4da6880a077")

mothers = [
  {
    "nome": "Ana Cristina",
    "sobrenome": "Viera de Melo",
    "descrição": "Professora titular no IME-USP, atua em Engenharia de Software, Métodos Formais e Linguagens de Programação. Suas pesquisas incluem automação de regras para programação orientada a objetos e validação de transformações de programas orientados a objetos utilizando o Alloy Analyzer. Contribui para o desenvolvimento de ambientes formais de desenvolvimento de programas."
  },
  {
    "nome": "Cristina",
    "sobrenome": "Fernandes",
    "descrição": "Professora associada no IME-USP, com doutorado pelo Georgia Institute of Technology. Suas pesquisas envolvem Algoritmos, Otimização Combinatória e Teoria dos Grafos. É membro do grupo de pesquisa em Ciência da Computação Teórica, Combinatória e Otimização Combinatória."
  },
  {
    "nome": "Kelly",
    "sobrenome": "Braghetto",
    "descrição": "Professora assistente no IME-USP, especializada em Bancos de Dados, Gerenciamento de Fluxo de Trabalho e Métodos Formais. Suas pesquisas incluem modelagem formal e análise de fluxos de trabalho, avaliação de desempenho e integração de dados. Contribui para o desenvolvimento de plataformas de cidades inteligentes escaláveis."
  },
  {
    "nome": "Leliane",
    "sobrenome": "Nunes de Barros",
    "descrição": "Professora livre-docente no IME-USP, com foco em Inteligência Artificial e Planejamento Automatizado. Suas pesquisas incluem Processos de Decisão de Markov Sensíveis ao Risco e planejamento simbólico para políticas fortemente cíclicas. Contribui para o desenvolvimento de políticas ótimas em processos de decisão com restrições de custo."
  },
  {
    "nome": "Nami",
    "sobrenome": "Kobayashi",
    "descrição": "Professora aposentada do IME-USP, especializada em Linguagens Formais e Autômatos. Suas pesquisas abordam relações racionais, expressões regulares e funções subsequenciais. Contribuiu significativamente para o ensino e desenvolvimento de teorias formais na computação."
  },
  {
    "nome": "Nina Sumiko",
    "sobrenome": "Tomita Hirata",
    "descrição": "Professora livre-docente no IME-USP, com doutorado em Ciência da Computação pela USP. Suas pesquisas incluem classificação de doenças retinianas com aprendizado de máquina e análise de imagens oftalmológicas. Contribui para o avanço da inteligência artificial aplicada à saúde ocular."
  },
  {
    "nome": "Renata",
    "sobrenome": "Wassermann",
    "descrição": "Professora associada no IME-USP, com doutorado pela Universidade de Amsterdã. Suas pesquisas envolvem Inteligência Artificial, Lógica e Representação de Conhecimento. É membro do grupo de pesquisa em Lógica, Inteligência Artificial e Métodos Formais (LIAMF) e pesquisadora no Centro de Inteligência Artificial (C4AI)."
  },
  {
    "nome": "Yoshiko",
    "sobrenome": "Wakabayashi",
    "descrição": "Professora titular no IME-USP, com doutorado pela Universidade de Augsburg. Suas pesquisas incluem otimização combinatória, teoria dos grafos, algoritmos e combinatória poliedral. Foi premiada com a Ordem Nacional do Mérito Científico e eleita membro da Academia Brasileira de Ciências."
  },
  {
    "nome": "Ada",
    "sobrenome": "Lovelace",
    "descrição": "Matemática e escritora britânica, considerada a primeira programadora de computadores. Trabalhou com Charles Babbage no projeto da máquina analítica e escreveu notas que descreviam um algoritmo para calcular números de Bernoulli, sendo reconhecida como a primeira pessoa a conceber um algoritmo destinado a ser processado por uma máquina."
  },
  {
    "nome": "Grace",
    "sobrenome": "Hopper",
    "descrição": "Almirante da Marinha dos EUA e cientista da computação, desenvolveu o primeiro compilador para um computador eletrônico e foi pioneira na criação da linguagem COBOL. Popularizou o termo 'debugging' no contexto de programação."
  },
  {
    "nome": "Radia",
    "sobrenome": "Perlman",
    "descrição": "Conhecida como a 'mãe da internet', desenvolveu o algoritmo Spanning Tree Protocol (STP), fundamental para a operação das redes Ethernet modernas, permitindo a comunicação eficiente entre dispositivos em redes locais."
  },
  {
    "nome": "Frances",
    "sobrenome": "Allen",
    "descrição": "Pioneira na otimização de compiladores, desenvolveu técnicas que melhoraram a eficiência dos programas de computador. Foi a primeira mulher a receber o Prêmio Turing, considerado o 'Nobel da computação'."
  },
  {
    "nome": "Barbara",
    "sobrenome": "Liskov",
    "descrição": "Cientista da computação, desenvolveu o princípio da substituição de Liskov, fundamental para a programação orientada a objetos. Foi a primeira mulher a receber o Prêmio Turing."
  },
  {
    "nome": "Marissa",
    "sobrenome": "Mayer",
    "descrição": "Primeira engenheira de software do Google, contribuiu para o desenvolvimento da interface de usuário do Google Search. Posteriormente, foi CEO do Yahoo, liderando a empresa em um período de transformação digital."
  },
  {
    "nome": "Dorothy",
    "sobrenome": "Vaughan",
    "descrição": "Matemática e programadora da NASA, foi uma das primeiras mulheres afro-americanas a trabalhar como programadora em computadores eletrônicos. Foi pioneira na programação em COBOL na NASA."
  },
  {
    "nome": "Sister Mary Kenneth",
    "sobrenome": "Keller",
    "descrição": "Primeira mulher a obter um doutorado em ciência da computação nos Estados Unidos. Contribuiu para a introdução da computação no ensino superior e foi defensora do uso de computadores na educação."
  },
  {
    "nome": "Annie",
    "sobrenome": "Easley",
    "descrição": "Matemática e cientista da computação, trabalhou na NASA desenvolvendo software para foguetes e sistemas de controle de voo. Foi uma das primeiras mulheres afro-americanas a trabalhar como cientista na NASA."
  },
  {
    "nome": "Margaret",
    "sobrenome": "Hamilton",
    "descrição": "Engenheira de software na missão Apollo da NASA, desenvolveu o software de controle de voo que foi crucial para o sucesso das missões lunares. Ela é creditada por ter cunhado o termo 'engenharia de software'."
  },
  {
    "nome": "Lynn",
    "sobrenome": "Conway",
    "descrição": "Cientista da computação, trabalhou no desenvolvimento de computadores eletrônicos e hardware. Foi pioneira na arquitetura de computadores e na programação de sistemas operacionais."
  },
  {
    "nome": "Daphne",
    "sobrenome": "Koller",
    "descrição": "Cientista da computação israelense-americana, professora na Universidade de Stanford e cofundadora do Coursera, plataforma de educação online. Suas pesquisas incluem aprendizado de máquina, modelos gráficos probabilísticos e suas aplicações em biomedicina. Fundadora e CEO da insitro, empresa que utiliza aprendizado de máquina para descoberta de medicamentos."
  },
    {
    "nome": "Timnit",
    "sobrenome": "Gebru",
    "descrição": "Pesquisadora em inteligência artificial, ética algorítmica e mineração de dados. Cofundadora do Black in AI, uma iniciativa que promove a inclusão de profissionais negros na área de IA. Fundadora do Distributed Artificial Intelligence Research Institute (DAIR), focado em desenvolver IA ética e acessível. Sua pesquisa destaca os vieses e impactos ambientais de modelos de linguagem em larga escala, defendendo uma abordagem mais equitativa e transparente no desenvolvimento de IA."
  },
  {
    "nome": "Chieko",
    "sobrenome": "Asakawa",
    "descrição": "Pesquisadora no campo da acessibilidade digital, desenvolveu tecnologias inovadoras como o IBM Home Page Reader, um sistema de navegação na web por voz para deficientes visuais. Seu trabalho contínuo explora como a inteligência artificial pode aumentar a independência de pessoas com deficiências, promovendo uma sociedade mais inclusiva."
  },
  {
    "nome": "Mary Jane",
    "sobrenome": "Irwin",
    "descrição": "Especialista em arquitetura de computadores, com foco em sistemas embarcados e computação móvel. Sua pesquisa aborda o design de sistemas computacionais com consciência de energia e confiabilidade, além de explorar tecnologias emergentes em sistemas computacionais."
  },
  {
    "nome": "Maria",
    "sobrenome": "Borg",
    "descrição": "Pioneira na promoção da participação feminina em tecnologia, cofundadora da Grace Hopper Celebration, a maior conferência de mulheres na computação. Fundadora do Instituted for Women and Technology, que mais tarde se tornou o Anita Borg Institute, dedicado a apoiar mulheres na tecnologia."
  },
  {
    "nome": "Reshma",
    "sobrenome": "Clark",
    "descrição": "Fundadora do Girls Who Code, uma organização sem fins lucrativos que visa fechar a lacuna de gênero na tecnologia, oferecendo educação em ciência da computação para meninas. Seu trabalho tem sido fundamental para aumentar a participação feminina na área de tecnologia."
  },
  {
    "nome": "Jennifer",
    "sobrenome": "Klawe",
    "descrição": "Presidente do Harvey Mudd College, com contribuições significativas em matemática e ciência da computação. Seu trabalho inclui análise funcional, matemática discreta, ciência da computação teórica e interação humano-computador. É defensora da inclusão de mulheres e minorias sub-representadas em STEM."
  },
  {
    "nome": "Shafi",
    "sobrenome": "Goldwasser",
    "descrição": "Premiada com o Prêmio Turing em 2012 por suas contribuições fundamentais à criptografia. Desenvolveu os fundamentos teóricos da criptografia moderna, incluindo provas interativas de conhecimento zero e criptografia probabilística, com aplicações em segurança e privacidade."
  },
  {
    "nome": "Sister Mary",
    "sobrenome": "Norris-Grey",
    "descrição": "Pioneira na educação em ciência da computação, foi uma das primeiras mulheres a obter um doutorado em ciência da computação nos Estados Unidos. Defensora do uso de computadores na educação, contribuindo para a formação de futuras gerações de profissionais de tecnologia."
  },
  {
    "nome": "Fei-Fei",
    "sobrenome": "Li",
    "descrição": "Pesquisadora em inteligência artificial, conhecida por seu trabalho no desenvolvimento do ImageNet, um banco de dados visual que impulsionou o avanço do aprendizado profundo. Cofundadora do AI4ALL, uma iniciativa para aumentar a diversidade na IA. Atualmente, lidera a World Labs, focada em inteligência artificial espacial."
  },
  {
    "nome": "Mary",
    "sobrenome": "Sieckenius",
    "descrição": "Pesquisadora em ciência da computação, com foco em áreas como aprendizado de máquina, processamento de linguagem natural e ética em IA. Seu trabalho contribui para o desenvolvimento de tecnologias de IA mais justas e acessíveis."
  }
]

def limpar_texto(texto):
    return re.sub(r'[^A-Za-zÀ-ÿ0-9]', '', texto)

# --- gerar mothers.csv ---
with open("mothers.csv", "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["first_name", "last_name", "description"])
    writer.writeheader()
    for mother in mothers:
        writer.writerow({
            "first_name": mother["nome"],
            "last_name": mother["sobrenome"],
            "description": mother["descrição"]
        })

# --- gerar danames.csv ---
combinacoes = []
for i, p1 in enumerate(mothers):
    for j, p2 in enumerate(mothers):
        if i != j:
            nome1 = limpar_texto(p1["nome"])
            sobrenome1 = limpar_texto(p1["sobrenome"])
            nome2 = limpar_texto(p2["nome"])
            sobrenome2 = limpar_texto(p2["sobrenome"])
            
            combinacoes.append({
                "nickname": f"{nome1}{nome2}",
                "first_mome_full_name": f"{p1['nome']} {p1['sobrenome']}",
                "last_mome_full_name": f"{p2['nome']} {p2['sobrenome']}"
            })
            combinacoes.append({
                "nickname": f"{nome1}{sobrenome2}",
                "first_mome_full_name": f"{p1['nome']} {p1['sobrenome']}",
                "last_mome_full_name": f"{p2['nome']} {p2['sobrenome']}"
            })
            combinacoes.append({
                "nickname": f"{sobrenome1}{nome2}",
                "first_mome_full_name": f"{p1['nome']} {p1['sobrenome']}",
                "last_mome_full_name": f"{p2['nome']} {p2['sobrenome']}"
            })
            combinacoes.append({
                "nickname": f"{sobrenome1}{sobrenome2}",
                "first_mome_full_name": f"{p1['nome']} {p1['sobrenome']}",
                "last_mome_full_name": f"{p2['nome']} {p2['sobrenome']}"
            })

# remover duplicatas
uniq = {c["nickname"]: c for c in combinacoes}.values()
combinacoes = list(uniq)

# randomizar
random.shuffle(combinacoes)

with open("danames.csv", "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["nickname", "first_mome_full_name", "last_mome_full_name"])
    writer.writeheader()
    writer.writerows(combinacoes)

print(f"{len(mothers)} mothers salvas em mothers.csv")
print(f"{len(combinacoes)} danames salvas em danames.csv")