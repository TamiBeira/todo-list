import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    const tasks = await Task.findAll({
      where: { user_id: req.userId, check: false },
    });

    return res.json(tasks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
        title_task: Yup.string().required(),
        task: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha ao cadastrar. ' });
    }

    const { title_task, task } = req.body;

    const tasks = await Task.create({
      user_id: req.userId,
      title_task,
      task,
    });

    return res.json(tasks);
  }

  //Check
  async update(req, res) {
    const { task_id } = req.params;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: 'Tarefa não existe.' });
    }

    await task.update(req.body);

    return res.json(task);
  }

  async delete(req, res) {
    const { task_id } = req.params;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: 'Tarefa não existe.' });
    }

    if (task.user_id !== req.userId) {
      return res.status(401).json({ error: 'Requisição não autorizada.' });
    }

    await task.destroy();
    return res.status(204).send();
  }

  // Editar tarefa
  async editTask (req, res){

    const schema = Yup.object().shape({
        title_task: Yup.string(),
        task: Yup.string()
    })
  
    if(!(await schema.isValid(req.body))){
        return res.status(400).json({error: 'Falha na validação!'})
    }
  
    const tasks = await task.findByPk(req.id)
  
    const {id, title_task, task} = await task.update(req.body)
  
    return res.json({
        id,
        title_task,
        task
    })
  }



}






export default new TaskController();
