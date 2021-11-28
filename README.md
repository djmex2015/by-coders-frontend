# by-coders-frontend


Front-End: Basicamente a implementação foi feita com o Angular 13 (13.0.2) e usei o Node.JS (16.13) como uma plataforma de desenvolvimento aproveitando também pelo seu soporte que é muito bom. Caso o site tivesse um ambiente de producao, 
o Apache seria uma boa opção. Usei tambem outras librerias de apoio a em CSS Material Angular, elas tem uma boa homologacao en funcao de sua compatibilidade com o framework.

Pra rodar o frontend tem que ser executado asim:

	$	npm install //baixar os modulos da app
	$	npm start	//inicializa o app
	
Este vai ser visualizado mediante o browser em o port 4200 --> http://localhost:4200.


Back-End: O BackEnd foi desenvolvido em Java 11 usando Spring Boot 2 (v2.5.6), desenvolvido no Spring 5 (muito bom soporte), aproveitando a otimização de recursos de automação de tasks.
Aqui se uso outras tecnologias como spring-data, spring-web, lombok, spring-boot-maven-plugin, etc...nao tive a necessidade de outras que poderiam ser adicioandas tambem. 

Pra rodar o backend tem que ser executado asim:

	$	mvn spring-boot:run spring-boot.run.jvmArguments=-noverify -XX:TieredStopAtLevel=1 spring-boot.run.mainClass=com.example.BasicApplication Env.SPRING_OUTPUT_ANSI_ENABLED=always
	
uo tambem:

	$	mvn clean package spring-boot:repackage
	$	java -jar target/basic-0.0.1-SNAPSHOT

pode ser adicionado mais argumentos (memoria,cache,etc...) tambem para melhorar a performance, dependendo do contexto infra-estrutural onde se este executamdo.
Ao executar essas linhas vai ficar escutando no porto 8080, o qual o client (frontend), vai pegar os endpoints dele, describendo os endpoints (pudesse haber usado swagger pra documentar os servicos
 mas como sao poucos, achei que nao vale a pena):

http://localhost:8080/processFile  

--> PARAMETROS: Um MultipartFile de nome 'file' 
--> RETORNA: Um boolean sucess/error 
--> FUNCAO: Adiciona as operaciones do archivos em a DB

http://localhost:8080/listMovimentos 

--> PARAMETROS: --- 
--> RETORNA: Uma lista de objectos
--> FUNCAO: Lista as operaciones agrupadas por nome de lojas

http://localhost:8080/reset 

--> PARAMETROS: --- 
--> RETORNA: ---
--> FUNCAO: Limpa a tabela de operacoes

Foi usado postman pra testar os endpoints, aqui vai um exemplo da devolucao do /listMovimentos: 

{
    "MERCEARIA 3 IRMÃOS": 28092.0,
    "LOJA DO Ó - FILIAL": 609.28,
    "MERCADO DA AVENIDA": 9340.8,
    "BAR DO JOÃO       ": 1624.0,
    "LOJA DO Ó - MATRIZ": 1736.0
}


Banco de Dados: Foi usado MySQL Server 8.0.27-1debian10 (imagem hosted em Hub Docker), pra persistencia dos registros, pra baixar a imagem deve ser feita do site de hub-docker (https://hub.docker.com/_/mysql). 

* Adiciono para mais detalhe na criacao da DB em outro arquivo (readme-sql.md) do projecto my-coders-backend, onde ai esta descrito tudo o trace da command-line-client da plataforma.





