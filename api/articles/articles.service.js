const Article = require("./articles.schema");

class ArticleService {
    async create(data) {
        const article = new Article(data);
        return article.save();
    }

    update(id, data) {
        return Article.findByIdAndUpdate(id, data, { new: true });
    }

   async delete(id) {
        return await Article.findByIdAndDelete(id);
      }

    async getArticlesByUserId(userId) {
    return Article.find({ user: userId }).populate("user", "name email"); 
    }
}

module.exports = new ArticleService();