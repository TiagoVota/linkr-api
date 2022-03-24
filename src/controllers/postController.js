import { postRepository } from '../repositories/postRepository.js'

export async function createPost(req, res, next) {
  const postInfo = req.body
  const userId = res.locals.userId

  let info = {
      url: "https://oglobo.globo.com/politica/prefeito-diz-que-pastor-lobista-pediu-propina-ate-em-biblias-para-liberar-recursos-do-mec-1-25445777?utm_source=globo.com&utm_medium=oglobo",
      title: "titulo",
      description: "description",
      image: "https://ogimg.infoglobo.com.br/in/25445098-e16-ebe/FT1086A/98230622_BSB30-11-2021Ministro-da-Educacao-Milton-Ribeiro-com-o-Pastor-Arilton.-Fotos-Luis-For.jpg"
  }

  try {
    const post = await postRepository.createPost(info.url, info.title, info.description, info.image, userId, postInfo.message)  

    res.status(200).send({})
  } catch (error) {
    // console.log(error)
    next(error)
  }
}
