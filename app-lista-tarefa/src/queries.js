const Pool = require('pg').Pool
const pool = new Pool({
    user: 'developer',
    host: 'localhost',
    database: 'to-do-list',
    password: '123456',
    port: 5433,
});

const getLists = (request, response) => {
    pool.query('SELECT * FROM list ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getListById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM list WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const createList = (request, response) => {
    const {
        name, checked
    } = request.body

    pool.query('INSERT INTO list (name, checked) VALUES ($1, $2)', [name, checked], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`List added`);
    })
};

const updateList = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        name, checked
    } = request.body

 pool.query(
        'UPDATE list SET name = $1, checked = $2  WHERE id = $3',
        [name, checked, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`List modified`)
        }
    )   
}

const deleteList = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM list WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`List deleted with ID: ${id}`)
    })
}

//add funçao para check
const checkById = (request, responde) => {
    const id = parseInt(request.params.id);
    const {
        name, checked
    } = request.body
    pool.query(
        'UPDATE list SET name = $1, checked = $2  WHERE id = $3',
        [name, checked, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`List modified`)
        }
    )
}

module.exports = {
    getLists,
    getListById,
    createList,
    updateList,
    deleteList,
    //export check
    checkById, 
}