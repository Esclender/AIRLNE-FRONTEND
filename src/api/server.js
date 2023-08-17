import { Api } from './axios'

class ApiConnection extends Api {
  constructor (route) {
    super()
    this.route = route

    this.handleRequest()
    this.handleResponse()
  }

  async getAllData () {
    try {
      const { data } = await this.instance.get(this.route.get)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  async createData (body) {
    const { data } = await this.instance.post(this.route.post, body)

    return data
  }

  async deleteData (id) {
    const { data } = await this.instance.delete(`${this.route.delete}/${id}`)
    return data
  }

  async updateData (id, body) {
    const { data } = await this.instance.put(`${this.route.put}/${id}`, body)
    return data
  }
}
export default ApiConnection
