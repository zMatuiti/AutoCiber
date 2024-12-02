exports.getHome = (req, res) => {
    res.json({ message: 'Bienvenido a la API backend' });
  };
  
  exports.createItem = (req, res) => {
    const { name, description } = req.body;
    // Lógica para crear un nuevo item (ejemplo)
    res.json({ message: 'Item creado', item: { name, description } });
  };
  