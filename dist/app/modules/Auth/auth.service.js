"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = async (payload) => {
    const user = await user_model_1.User.isUserExistsByCustomId(payload.id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    //checking if the password is correct
    if (!(await user_model_1.User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //Access Granted :send AccessToken . RefreshToken
    //Create token and send it to the user
    const JwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_secret, {
        //expiresIn: config.jwt_access_expiration,
        expiresIn: "5s",
    });
    const refreshToken = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_refresh_secret, {
        //expiresIn: config.jwt_refresh_expiration,
        expiresIn: "365d",
    });
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange,
    };
};
const changePassword = async (userData, payload) => {
    // checking if the user is exist
    const user = await user_model_1.User.isUserExistsByCustomId(userData.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    //checking if the password is correct
    if (!(await user_model_1.User.isPasswordMatched(payload.oldPassword, user?.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //hash new password
    const newHashedPassword = await bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    await user_model_1.User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
};
const refreshToken = async (token) => {
    //if the token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    //if the user role is not in the required roles
    // checking if the user is exist
    const user = await user_model_1.User.isUserExistsByCustomId(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    //Create token and send it to the user
    const JwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_secret, {
        //expiresIn: config.jwt_access_expiration,
        expiresIn: "1d",
    });
    return {
        accessToken,
    };
};
// const forgotPassword = async (userId: string) => {
//   const user = await User.isUserExistsByCustomId(userId);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status;
//   if (userStatus === "blocked") {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
//   }
//   const JwtPayload = {
//     userId: user.id,
//     role: user.role,
//   };
//   const resetToken = jwt.sign(JwtPayload, config.jwt_secret as any, {
//     //expiresIn: config.jwt_access_expiration,
//     expiresIn: "10m",
//   });
//   const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;
//   console.log(resetUILink);
//   sendEmail(user.email, resetUILink);
//   //return resetUILink
// };
const resetPassword = async (payload, token) => {
    const user = await user_model_1.User.isUserExistsByCustomId(payload.id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    if (decoded.userId !== payload.id) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized !");
    }
    //hash new password
    const newHashedPassword = await bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    await user_model_1.User.findOneAndUpdate({
        id: decoded.userId,
        role: decoded.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    console.log(decoded);
};
exports.AuthService = {
    loginUser,
    changePassword,
    refreshToken,
    resetPassword,
};
