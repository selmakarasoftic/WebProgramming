<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
Flight::group('/auth', function() {
   /**
    * @OA\Post(
    *     path="/auth/register",
    *     summary="Register new user.",
    *     description="Add a new user to the database.",
    *     tags={"auth"},
    *     security={
    *         {"ApiKey": {}}
    *     },
    *     @OA\RequestBody(
    *         description="Add new user",
    *         required=true,
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 required={"password", "email","username"},
    *                 @OA\Property(
    *                     property="password",
    *                     type="string",
    *                     example="password",
    *                     description="User password"
    *                 ),
    *                 @OA\Property(
    *                     property="email",
    *                     type="string",
    *                     example="test@gmail.com",
    *                     description="User email"
    *                 ),
    *                 @OA\Property(property="username", type="string", example="username", description="username"),

    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="User has been added."
    *     ),
    *     @OA\Response(
    *         response=500,
    *         description="Internal server error."
    *     )
    * )
    */
    /*
   Flight::route("POST /register", function () {
       //$data = Flight::request()->data->getData();
       //$data = Flight::request()->data->getData();
$data = json_decode(Flight::request()->getBody(), true);

        if (!is_array($data)) {
        Flight::halt(400, 'Invalid request body. JSON object expected.');
    }
     //   if (!is_array($data)) {
      //  Flight::halt(400, 'Invalid request body. JSON object expected.');
    //}
       $response = Flight::auth_service()->register($data);
  
       if ($response['success']) {
           Flight::json([
               'message' => 'User registered successfully',
               'data' => $response['data']
           ]);
       } else {
           Flight::halt(500, $response['error']);
       }
   });*/

Flight::route("POST /register", function () {
    //$rawBody = Flight::request()->getBody();
    //file_put_contents('body_debug.log', $rawBody); // 👈 debug log
    //$data = json_decode($rawBody, true);
    
    $data = json_decode(Flight::request()->getBody(), true);

    if (!is_array($data)) {
        Flight::halt(400, 'Invalid JSON. Body must be a valid object.');
    }

    $response = Flight::auth_service()->register($data);

    if ($response['success']) {
        Flight::json([
            'message' => 'User registered successfully',
            'data' => $response['data']
        ]);
    } else {
        Flight::halt(500, $response['error']);
    }
});


   /**
    * @OA\Post(
    *      path="/auth/login",
    *      tags={"auth"},
    *      summary="Login to system using email and password",
    *      @OA\Response(
    *           response=200,
    *           description="Student data and JWT"
    *      ),
    *      @OA\RequestBody(
    *          description="Credentials",
    *          @OA\JsonContent(
    *              required={"email","password"},
    *              @OA\Property(property="email", type="string", example="demo@gmail.com", description="email address"),
    *              @OA\Property(property="password", type="string", example="password", description="password"),
    *          )
    *      )
    * )
    */
   Flight::route('POST /login', function() {
       $data = Flight::request()->data->getData();


       $response = Flight::auth_service()->login($data);
  
       if ($response['success']) {
           Flight::json([
               'message' => 'User logged in successfully',
               'data' => $response['data']
           ]);
       } else {
           Flight::halt(500, $response['error']);
       }
   });
});
?>
