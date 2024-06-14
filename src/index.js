const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./firebase')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlEncoded({extended: true}))

app.post('/aluno', async (req, res) => {
	try {
		await db.collection('alunos').add(req.body)
		res.status(201).send('Aluno inserido com sucesso!')
  	} catch (err) {
		console.error(err)
    	res.status(500).send()
  	}
})

app.get('/aluno/:id', async (req, res) => {
	try {
		const doc = await db.collection('alunos').doc(req.params.id).get()

		if (!doc.exists) {
			res.status(404).send('Aluno não encontrado!')
		} else {
			res.status(200).send(doc.data())
		}
	} catch (err) {
		console.error(err)
		res.status(500).send()
	}
})

app.put('/aluno', async (req, res) => {
	try {
		await db.collection('alunos').doc(req.body.id).update(req.body)
		res.status(200).send('Aluno atualizado com sucesso!')
	} catch (err) {
		console.error(err)
		res.status(500).send()
	}
})

app.delete('/aluno', async (req, res) => {
	try {
		await db.collection('alunos').doc(req.body.id).delete()
		res.status(200).send('Aluno excluido com sucesso!')
	} catch (err) {
		console.error(err)
		res.status(500).send()
	}
})

app.listen(PORT, () => {
  	console.log(`Iniciado na porta: ${PORT}`)
})