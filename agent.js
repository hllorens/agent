"use strict";


var go=function(txt){
    console.log("go:"+txt);
    var outputbox=document.getElementById('output');
    outputbox.innerHTML=process(txt);
}


var process=function(txt){
    return nlp(txt);
    if(commands.hasOwnProperty(txt.toLowerCase().trim())){
        return commands[txt];
    }else{
        return "no entiendo";
    }
}

// from firebase we retrieve the user object
var user={
    // id phone
    name: "",
    phone: "666666666",
    state: "first-time",
    pair: ""
}


var nlp=function(txt){
    var answer="que qué?";
    switch(user.state){
        case "first-time":
            if(user.name==""){
                answer="Hola! antes de nada, cómo te llamas?";
                user.state="get_name";
            }else if(user.pair==""){
                answer="para jugar en la liga necesito que me digas el teléfono de tu pareja en dígitos e.g., 669931087";
                user.state="get_pair";
            }
            break;
        case "get_name":
            user.name=txt.replace(/(claro|hola|((mi|el) )?nombre|es|me llamo)/g,"");
            answer="Encantado "+user.name+". Para jugar en la liga necesito que me digas el teléfono de tu pareja en dígitos e.g., 669931087";
            user.state="get_pair";
            break;
        case "get_pair":
            user.pair=""+txt.replace(/\b(claro|hola|mi|el|teléfono|móvil|número|pareja|compañero|es)\b/g,"").trim();
            if(user.pair==user.phone){
                answer="Has puesto tu propio teléfono... quieres jugar contigo mismo? Aún no tenemos esa modalidad... supongo que ha sido un error. Necesito que me digas el teléfono de tu pareja en dígitos e.g., 669931087"
                user.pair="";
                user.state="get_pair";
           }else{
                // mejor pillar los dígitos seguidos y deben ser 9 o +11 con código de país, si no lo tiene se lo añdimos para estandarizar
                answer="Apunto \""+user.pair+"\" como tu compañero";
                user.state="first-time";
            }
            break;
        default:
            break;
    }
    return answer;
}


var commands= {
"hola": "Â¡Hola! Bienvenido a *Weeplay* ðŸ‘‹ðŸ‘‹   - Escribe *reservar* si quieres reservar una pista completa - Escribe *liga* si quieres apuntarte a uno de nuestros torneos de pÃ¡del - Escribe *buscar* si quieres buscar rivales o pareja ideal - Escribe *clases* si quieres recibir clases de pÃ¡del o tenis",
"quiero": "Â¡Hola! Bienvenido a *Weeplay* ðŸ‘‹ðŸ‘‹   - Escribe *reservar* si quieres reservar una pista completa - Escribe *liga* si quieres apuntarte a uno de nuestros torneos de pÃ¡del - Escribe *buscar* si quieres buscar rivales o pareja ideal - Escribe *clases* si quieres recibir clases de pÃ¡del o tenis",
"hola,": "Â¡Hola! Bienvenido a *Weeplay* ðŸ‘‹ðŸ‘‹   - Escribe *reservar* si quieres reservar una pista completa - Escribe *liga* si quieres apuntarte a uno de nuestros torneos de pÃ¡del - Escribe *buscar* si quieres buscar rivales o pareja ideal - Escribe *clases* si quieres recibir clases de pÃ¡del o tenis",
"p": "Â¡GenialðŸ‘!  Â¿En quÃ© centro deportivo quieres jugar?   - *ph*: Centro deportivo La HÃ­pica - *ps*: SUMA Fitness Club Alfafar  - *po*: Complejo deportivo Orriols  - *pp*: SUMA Fitness Club Patacona - *pt*: Boix Team Tennis - *pn*: Atalanta Ronda Norte  - *pi*: Â¿DÃ³nde se encuentran estos polideportivos?",
"t": "Â¡GenialðŸ‘!  Â¿En quÃ© centro deportivo quieres jugar?   - *th*: Centro deportivo La HÃ­pica  - *ts*: SUMA Fitness Club Alfafar  - *to*: Complejo deportivo Orriols - *tt*: Boix Team Tennis  - *ti*: Â¿DÃ³nde se encuentran estos polideportivos?",
"Default": "Lo siento, no te he entendido... ðŸ™„ Soy un robot ðŸ¤– y aÃºn estoy aprendiendo.  Escribe sÃ³lo las palabras en *negrita*.  Las preguntas, a travÃ©s de ðŸ‘‡  Correo: info@weeplay.chat Instagram: @weeplay.chat",
"ph": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Centro deportivo la HÃ­pica?   - *phi*: InformaciÃ³n  - *phr*: Reservar pista de PÃ¡del",
"ps": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre SUMA Fitness Club Alfafar?   - *psi*: InformaciÃ³n  - *psr*: Reservar pista de PÃ¡del ",
"po": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Complejo deportivo Orriols?   - *poi*: InformaciÃ³n  - *por*: Reservar pista de PÃ¡del ",
"pp": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre SUMA Fitness Club Patacona?   - *ppi*: InformaciÃ³n  - *ppr*: Reservar pista de PÃ¡del ",
"pi": "Mapa de los centros deportivos:  https://drive.google.com/open?id=1Tl1Bb9z6Yk_L7xI-nKnKHz9s2wLVNSSE&usp=sharing  Entonces...Â¿CuÃ¡l te viene mejor? ðŸ¤”  - *ph*: Centro deportivo La HÃ­pica - *ps*: SUMA Fitness Club Alfafar  - *po*: Complejo deportivo Orriols  - *pp*: SUMA Fitness Club Patacona - *pt*: Boix Team Tennis - *pn*: Atalanta Ronda Norte",
"th": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Centro deportivo la HÃ­pica?   - *thi*: InformaciÃ³n  - *thr*: Reservar pista de Tenis ",
"ts": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre SUMA Fitness Club Alfafar?   - *tsi*: InformaciÃ³n  - *tsr*: Reservar pista de Tenis ",
"to": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Complejo deportivo Orriols?   - *toi*: InformaciÃ³n  - *tor*: Reservar pista de Tenis ",
"ti": "Mapa de los centros deportivos:  https://drive.google.com/open?id=1tTCnBscQ31YbAlwuU_n9n2AHmXMKWX67&usp=sharing  Entonces...Â¿CuÃ¡l te viene mejor? ðŸ¤”  - *th*: Centro deportivo La HÃ­pica  - *ts*: SUMA Fitness Club Alfafar  - *to*: Complejo deportivo Orriols - *tt*: Boix Team Tennis",
"phi": "- NÂº: 4 pistas - Tipo: Cemento - Entorno: Exterior  Tras esta informaciÃ³n, te interesa jugar aquÃ­?   - *phr*: SÃ­, me interesa - *p*: No, no me convence este centro ",
"psi": "- NÂº: 10 pistas - Tipo: Cristal - Entorno: Exterior y cubierto  Tras esta informaciÃ³n, te interesa jugar aquÃ­?   - *psr*: SÃ­, me interesa - *p*: No, no me convence este centro ",
"poi": "- NÂº: 4 pistas",
"ppi": "- NÂº: 4 pistas",
"thi": "- NÂº: 3 pistas",
"tsi": "- NÂº: 2 pistas",
"toi": "- NÂº: 3 pistas",
"phd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"psd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pod": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"ppd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"thd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"tsd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"tod": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"si": "Â¿Quieres confirmar?  - *s*: SÃ­, reservame la pista - *n*: Ya jugarÃ© en otro momento",
"no": "Lo siento, no estÃ¡ disponible ðŸ˜”  - *reservar*: Hablar a Weeplay para encontrar otras opciones - *n*: Ya jugarÃ© en otro momento",
"s": "Gracias por confirmar!!  Paga en la pista a nombre de *Weeplay*, disfruta de la partida y te esperamos pronto por aquÃ­ ðŸ‘‹  - Recuerda mandar *hola* la siguiente vez que quieras reservar una pista - Si quieres cancelar la partida, escribe *cancelar*",
"n": "Gracias por utilizar *Weeplay* ðŸ˜Ž  Recuerda mandar *hola* la siguiente vez que quieras reservar una pista",
"phr": "Escribe phd+nombre+dÃ­a+hora reserva ðŸ‘‡  Ejemplo: *phd Javier PÃ©rez 20 noviembre 17:00*",
"psr": "Escribe sd+nombre+dÃ­a+hora reserva ðŸ‘‡  Ejemplo: *psd Javier PÃ©rez 20 noviembre 17:00*",
"por": "Escribe pod+nombre+dÃ­a+hora reserva ðŸ‘‡  Ejemplo: *pod Javier PÃ©rez 20 noviembre 17:00*",
"ppr": "Escribe ppd+nombre+dÃ­a+hora reserva ðŸ‘‡  Ejemplo: *ppd Javier PÃ©rez 20 noviembre 17:00*",
"thr": "Escribe thd+nombre+dÃ­a+hora reservaðŸ‘‡  Ejemplo: *thd Javier PÃ©rez 20 noviembre 17:00*",
"tsr": "Escribe tsd+nombre+dÃ­a+hora reserva ðŸ‘‡  Ejemplo: *tsd Javier PÃ©rez 20 noviembre 17:00*",
"tor": "Escribe tod+nombre+dÃ­a+hora reserva ðŸ‘‡  Ejemplo: *tod Javier PÃ©rez 20 noviembre 17:00*",
"Cancelar": "Tu reserva ya ha sido cancelada.  Recuerda mandar *hola* la siguiente vez que quieras reservar una pista ðŸ™‚",
"Reserva PHR": "963 615 363 -",
"Reserva PSR": "http://www.sumapadelalfafar.com/Booking/Grid.aspx ",
"Reserva POR": "963 650 564 - ",
"Reserva PPR": "963 205 180 - ",
"Reserva THR": "963 615 363 -",
"Reserva TSR": "http://www.sumapadelalfafar.com/Booking/Grid.aspx ",
"Reserva TOR": "963 650 564 - ",
"pt": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Boix Team Tennis?   - *pti*: InformaciÃ³n  - *ptr*: Reservar pista de PÃ¡del",
"pm": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Polideportivo Malilla?   - *pmi*: InformaciÃ³n  - *pmr*: Reservar pista de PÃ¡del",
"pb": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Polideportivo BeterÃ³?   - *pbi*: InformaciÃ³n  - *pbr*: Reservar pista de PÃ¡del",
"pn": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre Atalanta Ronda Norte?   - *pni*: InformaciÃ³n  - *pnr*: Reservar pista de PÃ¡del",
"pc": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Centro Deportivo Moncada?   - *pci*: InformaciÃ³n  - *pcr*: Reservar pista de PÃ¡del",
"pa": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre PÃ¡del Indoor Albalat?   - *pai*: InformaciÃ³n  - *par*: Reservar pista de PÃ¡del",
"pz": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Complejo Deportivo La Canaleta?   - *pzi*: InformaciÃ³n  - *pzr*: Reservar pista de PÃ¡del",
"pq": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Polideportivo Quatre Carreres?   - *pqi*: InformaciÃ³n  - *pqr*: Reservar pista de PÃ¡del",
"tt": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Boix Team Tennis?   - *tti*: InformaciÃ³n  - *ttr*: Reservar pista de Tenis",
"tz": "Â¡Perfecto! ðŸ‘ Â¿QuÃ© deseas sobre el Complejo Deportivo La Canaleta?   - *tzi*: InformaciÃ³n  - *tzr*: Reservar pista de Tenis",
"tp": "",
"pti": "- NÂº: 2 pistas tipo...",
"pqi": "- NÂº: 4 pistas - Tipo: Cristal - Entorno: Exterior  Tras esta informaciÃ³n, te interesa jugar aquÃ­?   - *pqr*: SÃ­, me interesa - *p*: No, no me convence este centro ",
"tti": "- NÂº: 3 pistas - Tipo: Cemento - Entorno: Exterior  Tras esta informaciÃ³n, te interesa jugar aquÃ­?   - *ttr*: SÃ­, me interesa - *t*: No, no me convence este centro ",
"tzi": "- NÂº: 3 pistas - Tipo: Cemento - Entorno: Exterior  Tras esta informaciÃ³n, te interesa jugar aquÃ­?   - *tzr*: SÃ­, me interesa - *t*: No, no me convence este centro ",
"tpi": "",
"ptd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pmd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pbd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pnd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pcd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pad": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pzd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"pqd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"ttd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"tzd": "Perfecto!! Estamos comprobando la disponibilidad de la pista ðŸ˜‰",
"tpd": "",
"tpr": "",
"RESERVA PTR": "699301601 -",
"RESERVA PMR": "960018776 -",
"RESERVA PBR": "963389086 -",
"RESERVA PNR": "963489531 -",
"RESERVA PCR": "962060336 -",
"RESERVA PAR": "638886755 -",
"RESERVA PZR": "962110054 -",
"RESERVA PQR": "678808902 / 962112806",
"RESERVA TTR": "699301601 -",
"RESERVA TZR": "962110054 -",
"RESERVA TPR": "963372625",
"liga": "Bienvenido a las ligas de pÃ¡del que organiza *Weeplay* ðŸ† Para mÃ¡s informaciÃ³n escribe ",
"info": "Estamos organizando en Valencia ligas por niveles con el fin de mejorar tu nivel ðŸ” y conocer gente nueva ðŸ¤ Se jugarÃ¡ en los polideportivos de Patacona, Orriols y Alfafar, en los dÃ­as que a ti y a tu pareja os venga bien. La inscripciÃ³n es gratuita, solo se paga la pista. En este link teneis las bases de la competiciÃ³n.  https://docs.google.com/document/d/1aakXaVbzB9A1yYnxNb_2Vkl2GfCquaV54bsOPV8qnTs/edit?usp=sharing  Si te interesa, apÃºntate con tu pareja escribiendo: *inscripciÃ³n* + nombres + vuestro nivel de pareja",
"inscripcion / inscripciÃ³n": "Gracias por inscribirte!! para finalizar la inscripciÃ³n sigue nuestra cuenta de instagram @weeplay.chat y dinos el nombre de la pareja para identificaros. ",
"weeplay": "ðŸ˜Ž El futuro gestor de espacios deportivos ðŸ˜Ž",
"Buscar": "Bienvenido a *Weeplay* ðŸ‘‹ðŸ‘‹  Â¿Buscas uno, dos o tres jugadores para completar una partida de pÃ¡del?  Dinos cuÃ¡l es tu situaciÃ³n:  *A*- Estoy solo y busco pareja ideal *B*- Somos una pareja y buscamos 2 rivales *C*- Buscamos un jugador para completar la partida",
"B/C/D/E": "De acuerdo, en breves te atenderÃ¡ un operador humano ðŸ‘¨â€ðŸ’»",
"A admin": "Esta solo y busca pareja ideal",
"B admin": "Son pareja y buscan 2 rivales",
"C admin": "Busca un jugador para completar la partida",
"reservar": "Â¿Quieres reservar una pista? ðŸŽ¾   - Escribe  *P*  si quieres jugar a PÃ¡del - Escribe  *T* si quieres jugar a Tenis",
"gracias": "Gracias a ti por comprender mi funcionamiento ðŸ¤– Si quieres volver a utilizar *Weeplay* tan solo salÃºdame escribiendo *hola* ðŸ‘‹ ",
"clases": "Bienvenido a *Weeplay* ðŸ‘‹ðŸ‘‹  Vamos a buscar las mejores clases para ti ðŸ˜‰  - Ecribe *D* si buscas clases de PÃ¡del  - Escribe *E* si buscas clases de Tenis",
"D admin": "Busca clases particulares de pÃ¡del",
"E admin": "Busca clases particulares de tenis",
"A ": "Veo que estÃ¡s en busca de tu pareja ideal...ðŸ§ Si me respondes a las siguientes preguntas tratarÃ© de buscarte una lo mÃ¡s pronto posible!!",
"A": "Â¿CuÃ¡ntos aÃ±os tienes? (Escribe sÃ³lo el *nÃºmero*)",
"nÂº": "Escribe  *h*  si quieres que tu pareja sea hombre ðŸ§”, si quieres que sea mujer ðŸ‘© o  *i*  si te es indiferente ðŸ¤·â€â™‚ï¸",
"h/m/i": "Â¿En quÃ© lado prefieres jugar? ðŸ¤”  - *izquierdo* - *derecho* - *indiferente*",
"izquierdo/derecho /indiferente": "Â¿QuÃ© nivel tienes? ðŸ‘‡  - *Principiante*: 1,0 â€“ 2,0 - *Aficionado*: 2,25 â€“ 3,0 - *Amateur*: 3,25 â€“ 3,5 - *Avanzado*: 3,75 â€“ 4,0 - *Perfeccionamiento*: 4,25 â€“ 4,5 - *Experto*: 4,75 â€“ 5,5 ",
"PrincipianteAficionado/ Amateur/Avanzado/ Perfeccionamiento /Experto": "Â¡Genial! Ya hemos terminado ðŸ‘Œ Te avisaremos cuando la encontremos ðŸ˜‰"
}