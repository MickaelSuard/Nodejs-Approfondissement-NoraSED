const request = require("supertest");
const mockingoose = require("mockingoose");
const { app } = require("../server");
const Article = require("../api/articles/articles.schema");
const jwt = require("jsonwebtoken");
const config = require("../config/index");


describe("Routes Articles", () => {




    // User all perm
    const USER = {
        user: { id: "60d5f4ee2f8fb814c8b4b484", role: "admin" }
    }
    let token;


    const MOCK_ARTICLE_POST_RETURN = {
        _id: "60d5f4ee2f8fb814c8b4b485",
        title: "Test Article",
        content: "Contenu test article",
        user: "60d5f4ee2f8fb814c8b4b484",
        state: "draft"
    };

    const MOCK_ARTICLE_POST = {
        title: "Test Article",
        content: "Contenu test article",
        state: "draft"
    };

    const MOCK_ARTICLE_PUT = {
        title: "Article Modifié",
        content: "Contenu modifié test article",
        state: "published"
    }
    const MOCK_ARTICLE_PUT_RETURN = {
        _id: "60d5f4ee2f8fb814c8b4b485",
        title: "Article Modifié",
        content: "Contenu modifié test article",
        state: "published"
    }

    beforeAll(() => {
        mockingoose(Article).toReturn(MOCK_ARTICLE_POST_RETURN, "save");
        mockingoose(Article).toReturn(MOCK_ARTICLE_PUT_RETURN, "findOneAndUpdate");
    });

    test("[Articles] POST", async () => {
        token = jwt.sign(USER, config.secretJwtToken);
        const res = await request(app)
            .post("/api/articles")
            .set("x-access-token", token)
            .send(MOCK_ARTICLE_POST);
                expect(res.status).toBe(201);
                expect(res.body.title).toBe(MOCK_ARTICLE_POST_RETURN.title); 
        
    });

    test("[Articles] PUT", async () => {
        token = jwt.sign(USER, config.secretJwtToken);
        const res = await request(app)
            .put("/api/articles/60d5f4ee2f8fb814c8b4b485")
            .set("x-access-token", token)
            .send(MOCK_ARTICLE_PUT);
                expect(res.status).toBe(200);
                expect(res.body.title).toBe(MOCK_ARTICLE_PUT_RETURN.title);
    });

    test("[Articles] DELETE", async () => {
        token = jwt.sign(USER, config.secretJwtToken);
        const res = await request(app)
            .delete("/api/articles/60d5f4ee2f8fb814c8b4b485")
            .set("x-access-token", token)
            .send();
             expect(res.status).toBe(204);
    })

});