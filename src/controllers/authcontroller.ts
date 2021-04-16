import {getRepository, Repository} from "typeorm";
import User from "../entity/user";
import {NextFunction, Request, Response} from "express";
import passport from "passport";
import bcrypt from "bcrypt";

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
    postLogin(req: Request, res: Response, next: NextFunction) {
        // api post validation
        if (!req.body.email || !req.body.password) {
            req.flash("error", "Some required fields are empty");
            return res.redirect("/login");
        }

        // authenticate user
        passport.authenticate('local', function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash("error", "Email or password unknown");
                return res.redirect('/login');
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
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
    async postRegister(req: Request, res: Response, next: NextFunction) {
        // api post validation
        if (!req.body.name || !req.body.email || !req.body.email) {
            req.flash("error", "Some required fields are empty");
            return res.redirect("/register");
        }

        // create user object
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = await AuthController.hashPassword(req.body.password);

        // save user
        this.userRepository.save(user)
            .then(() => {
                this.postLogin(req, res, next);
                req.flash("info", "Your account is successfully created!");
            })
            .catch(() => {
                req.flash("error", "Email address is already used");
                res.redirect("/register");
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

    /*
     * hash password
     * @return Promise<string>
     */
    static async hashPassword(password: string, saltRounds = 10) {
        return await bcrypt.hash(password, saltRounds);
    }
}
