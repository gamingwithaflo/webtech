import {getRepository, Repository} from "typeorm";
import User from "../entity/user";
import {NextFunction, Request, Response} from "express";
import passport from "passport";

export default class AuthController {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    /*
     * get login
     * @route GET /login
     */
    login(req: Request, res: Response) {
        res.render("pages/login");
    }

    /*
     * post login
     * @route POST /login
     */
    // TODO implement flash errors
    postLogin(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/profile');
            });
        })(req, res, next);
    }

    /*
     * get register
     * @route GET /register
     */
    register(req: Request, res: Response) {
        res.render("pages/register");
    }

    /*
     * post register
     * @route POST /register
     */
    postRegister(req: Request, res: Response, next: NextFunction) {
        this.userRepository.save({
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password
        })
            .then(() => {
                this.postLogin(req, res, next);
                // res.redirect("login");
            })
            .catch(() => {
                req.flash("error", "Email address is already used");
                res.redirect("register");
            });
    }

    /*
     * post logout
     * @route POST /logout
     */
    logout(req: Request, res: Response) {
        req.logout();
        res.redirect("/");
    }
}
