const Article = require("./articles.schema");

class ArticlesService {
  async create(data) {
    console.log("Service create", data);
    const article = new Article(data);
    return article.save();
  }

  async update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Article.findByIdAndDelete(id);
  }

  async getArticlesByUserId(userId) {
    return Article.find({ user: userId }).populate("user", "name email"); 
  }
}

module.exports = new ArticlesService();
