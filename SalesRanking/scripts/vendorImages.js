 
    var vendorsWithImages = [
        {vendor:"Abertura De Clientes", image:"styles/images/avatars/3.jpg"},
        {vendor:"Rita Pereira", image:"styles/images/avatars/4.jpg"},
        {vendor:"Joana De Fatima Goncalves Pereira", image:"styles/images/avatars/1.jpg"},
        {vendor:"Olga Alves", image:"styles/images/avatars/6.jpg"},
        {vendor:"Artur Miguel Guedes Da Costa Dias Tripa", image:"styles/images/avatars/2.jpg"},
        {vendor:"Alfredo Matias Carvalho", image:"styles/images/avatars/daniel.jpg"},
        {vendor:"Maria Gomes", image:"styles/images/avatars/carine.jpg"},
        {vendor:"Carla Gaspar", image:"styles/images/avatars/catherine.jpg"},
        {vendor:"Jose Simoes", image:"styles/images/avatars/antonio.jpg"},
        {vendor:"Account Operators", image:"styles/images/avatars/5.jpg"}
    ];

    var vendorFileByUid = [
        {vendor:"Abertura De Clientes", file:"AberturaDeClientes"},
        {vendor:"Account Operators", file:"AccountOperators"},
        {vendor:"Alfredo Matias Carvalho", file:"AlfredoMatiasCarvalho"},
        {vendor:"Artur Miguel Guedes Da Costa Dias Tripa", file:"ArturMiguelGuedesDaC"},
        {vendor:"Carla Gaspar", file:"CarlaGaspar"},
        {vendor:"Glória Monteiro", file:"GloriaMonteiro"},
        {vendor:"Jaime Graça", file:"JaimeGraca"},
        {vendor:"Joana De Fatima Goncalves Pereira", file:"JoanaDeFatimaGoncalv"},
        {vendor:"Joana Santana", file:"JoanaSantana"},
        {vendor:"Joaquim Torres", file:"JoaquimTorres"},
        {vendor:"Jose Simoes", file:"JoseSimoes"},
        {vendor:"Maria Gomes", file:"MariaGomes"},
        {vendor:"Olga Alves", file:"OlgaAlves"},
        {vendor:"Pedro Freitas", file:"PedroFreitas"},
        {vendor:"Rita Pereira", file:"RitaPereira"}
    ];
    
    function vendorImage(vendorName) {
        var item = $.grep(vendorsWithImages, function(e){ return e.vendor == vendorName; });
        if(item && item.length > 0)
            return item[0].image;
        return "styles/images/default.gif";
    }

    function getTrophyImage(ranking) {
        if(ranking == 1)
            return "styles/images/Trofeu_1.png";
        if(ranking== 2)
            return "styles/images/Trofeu_2.png";
        return "styles/images/Trofeu_3.png";
    }

    function getFileByUid(uid) {
        var item = $.grep(vendorFileByUid, function(e){ return e.vendor == uid; });
        if(item && item.length > 0)
            return item[0].file;
        return "";
    }