'use strict';const _0x51b5=['./repository/RepositoryFactory','port','167065xatztf','passport','password','initializeMiddleware','./middleware/swagger_validator_handler','26zhHlOJ','api/swagger.yaml','NODE_ENV','./middleware/error_handler','log','swaggerUi','swaggerMetadata','public','locals','static','create','migrate','test','Strategy','/swagger.json','Server\x20is\x20ready\x20to\x20take\x20our\x20messages','322551rwIbST','sub','Your\x20server\x20is\x20listening\x20on\x20port\x20%d\x20(http://localhost:%d)','join','./middleware/user_activity_handler','swagger-tools','nodemailer','host','development','passport-jwt','exports','17116obyXIE','user','23DWIgYs','JWT_SECRET','mailingTransporter','cors','queryById','initialize','671005dGGAIy','express','listen','iat','log_iat','ExtractJwt','PORT','674837ZvVnCZ','createTransport','./config/mailing','path','swaggerValidator','latest','verify','safeLoad','config','2101qcXvpn','1349528ppULwC','Swagger-ui\x20is\x20available\x20on\x20http://localhost:%d/docs','queryByFilter','use','env','./knex/knex.js','fromAuthHeaderAsBearerToken'];const _0x2c8ec4=_0x4b2a;(function(_0x1b5d4e,_0x58ebca){const _0x50e63a=_0x4b2a;while(!![]){try{const _0x489ebe=parseInt(_0x50e63a(0x105))+parseInt(_0x50e63a(0x13f))*-parseInt(_0x50e63a(0x124))+-parseInt(_0x50e63a(0x134))+-parseInt(_0x50e63a(0x10c))+-parseInt(_0x50e63a(0xff))*-parseInt(_0x50e63a(0x115))+-parseInt(_0x50e63a(0x11f))+parseInt(_0x50e63a(0x116));if(_0x489ebe===_0x58ebca)break;else _0x1b5d4e['push'](_0x1b5d4e['shift']());}catch(_0xb23f4f){_0x1b5d4e['push'](_0x1b5d4e['shift']());}}}(_0x51b5,0x7027b));require('dotenv')[_0x2c8ec4(0x114)]();const passport=require(_0x2c8ec4(0x120)),passportJWT=require(_0x2c8ec4(0x13d)),ExtractJWT=passportJWT[_0x2c8ec4(0x10a)],JwtStrategy=passportJWT[_0x2c8ec4(0x131)],passportOpts={'jwtFromRequest':ExtractJWT[_0x2c8ec4(0x11c)](),'secretOrKey':process[_0x2c8ec4(0x11a)][_0x2c8ec4(0x100)]},fs=require('fs'),path=require(_0x2c8ec4(0x10f)),express=require(_0x2c8ec4(0x106));function _0x4b2a(_0x1fb7af,_0x108f28){_0x1fb7af=_0x1fb7af-0xff;let _0x51b5cf=_0x51b5[_0x1fb7af];return _0x51b5cf;}var app=express();const swaggerTools=require(_0x2c8ec4(0x139)),jsyaml=require('js-yaml'),options={'swaggerUi':path['join'](__dirname,_0x2c8ec4(0x132)),'controllers':path[_0x2c8ec4(0x137)](__dirname,'./controllers'),'useStubs':process['env'][_0x2c8ec4(0x126)]===_0x2c8ec4(0x13c)};var spec=fs['readFileSync'](path[_0x2c8ec4(0x137)](__dirname,_0x2c8ec4(0x125)),'utf8'),swaggerDoc=jsyaml[_0x2c8ec4(0x113)](spec);const knex=require(_0x2c8ec4(0x11b)),{RepositoryName,RepositoryFactory}=require(_0x2c8ec4(0x11d));RepositoryFactory[_0x2c8ec4(0x104)](knex);process[_0x2c8ec4(0x11a)][_0x2c8ec4(0x126)]!==_0x2c8ec4(0x130)&&knex[_0x2c8ec4(0x12f)][_0x2c8ec4(0x111)]();const nodemailer=require(_0x2c8ec4(0x13a)),{service}=require(_0x2c8ec4(0x10e)),transporter=nodemailer[_0x2c8ec4(0x10d)]({'host':service[_0x2c8ec4(0x13b)],'port':service[_0x2c8ec4(0x11e)],'secure':service['secure'],'auth':{'user':service[_0x2c8ec4(0x140)],'pass':service[_0x2c8ec4(0x121)]}});transporter[_0x2c8ec4(0x112)](function(_0x158fe7,_0x368d3d){const _0x32757b=_0x2c8ec4;_0x158fe7?console['log'](_0x158fe7):console[_0x32757b(0x128)](_0x32757b(0x133));}),app[_0x2c8ec4(0x12c)][_0x2c8ec4(0x101)]=transporter;const cors=require(_0x2c8ec4(0x102)),swaggerValidatorHandler=require(_0x2c8ec4(0x123)),userActivityHandler=require(_0x2c8ec4(0x138)),errorHandler=require(_0x2c8ec4(0x127));swaggerTools[_0x2c8ec4(0x122)](swaggerDoc,function(_0x3ef453){const _0x579a97=_0x2c8ec4;app[_0x579a97(0x119)](express[_0x579a97(0x12d)](_0x579a97(0x12b))),app['use'](_0x3ef453[_0x579a97(0x12a)]()),app[_0x579a97(0x119)](cors()),passport[_0x579a97(0x119)](new JwtStrategy(passportOpts,async function(_0x3e8090,_0x586d1b){const _0x155ece=_0x579a97,_0xb101d=RepositoryFactory[_0x155ece(0x12e)](RepositoryName['Session']),_0xc81813=_0xb101d[_0x155ece(0x118)]({'userId':_0x3e8090['sub'],'iat':_0x3e8090[_0x155ece(0x108)]});if(!_0xc81813)return _0x586d1b(null,![]);const _0x1d8f8c=RepositoryFactory[_0x155ece(0x12e)](RepositoryName['User']);let _0x373a0f=await _0x1d8f8c[_0x155ece(0x103)](_0x3e8090[_0x155ece(0x135)]);return _0x373a0f?(_0x373a0f[_0x155ece(0x109)]=_0x3e8090['iat'],_0x586d1b(null,_0x373a0f)):_0x586d1b(null,![]);}));const _0x2eb425=require('./middleware/auth_handler')(passport);app[_0x579a97(0x119)](passport[_0x579a97(0x104)]()),app[_0x579a97(0x119)](_0x2eb425),app[_0x579a97(0x119)](userActivityHandler()),app['use'](_0x3ef453[_0x579a97(0x110)]({'validateResponse':![]})),app[_0x579a97(0x119)](swaggerValidatorHandler),app[_0x579a97(0x119)](_0x3ef453['swaggerRouter'](options)),app[_0x579a97(0x119)](_0x3ef453[_0x579a97(0x129)]()),app[_0x579a97(0x119)](errorHandler),app[_0x579a97(0x107)](process[_0x579a97(0x11a)][_0x579a97(0x10b)]||0x1f90,function(){const _0x518735=_0x579a97;console[_0x518735(0x128)](_0x518735(0x136),process[_0x518735(0x11a)]['PORT'],process[_0x518735(0x11a)][_0x518735(0x10b)]),console['log'](_0x518735(0x117),process[_0x518735(0x11a)][_0x518735(0x10b)]);});}),module[_0x2c8ec4(0x13e)]=app;