 
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
    
    function vendorImage(vendorName) {
        var item = $.grep(vendorsWithImages, function(e){ return e.vendor == vendorName; });
        if(item && item.length > 0)
            return item[0].image;
        return "styles/images/default.gif";
    }
