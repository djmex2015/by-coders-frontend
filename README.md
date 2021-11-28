# by-coders-frontend


Front-End: Basicamente a implementação foi feita com o Angular 7 (7.3.9) e usei o Node.JS (10.15) como uma plataforma de desenvolvimento aproveitand também pelo seu apoio que é muito bom. Caso o site fosse produzido, o Apache seria uma boa opção. Eu também usei um modelo de bootstrap proprietário (alguns componentes não eram muito alinhados, já que não há muito suporte para ele e sua extensão para manipulação de código é paga), aproveitando sua capacidade de resposta absoluta para diferentes dispositivos.

Back-End:O BackEnd foi desenvolvido em Java 8 usando Spring Boot 2 (2.1.4), desenvolvido no Spring (muito bom soporte), aproveitando a otimização de recursos de automação de tarefas, incluindo seus cheques (por exemplo, a consulta da existência de registros) O aplicativo lerá as informações remotas das linhas e itinerários e elas persistirão ao iniciar o servidor (Tomcat embedded). Isso pode demorar um minuto para popularizá-las.

Banco de Dados: Em princípio use H2 (db in-memory) para que você possa resolver problemas mais específicos de desenvolvimento evitando a configuração dele, apenas no final ele se adapta ao MySQL com seu mecanismo de busca MySAM que é o utilizado pelo Spring (acho que e sua default) para usar como padrão a robustez que tem.

No application.properties da aplicação as duas bases foram deixadas como uma opção (incluindo a habilitação do H2 consolo em caso de necessidade, para H2 também deve ser alterada no POM seu escopo para runtime, atualmente em teste)
