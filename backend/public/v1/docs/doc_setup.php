<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

/**
 * @OA\Info(
 *     title="API",
 *     description="API for AutoVerse",
 *     version="1.0",
 *     @OA\Contact(
 *         email="selma.karasoftic@stu.ibu.edu.ba",
 *         name="Selma Karasoftic"
 *     )
 * )
 */

/**
 * @OA\Server(
 *     url="http://localhost/SelmaKarasoftic/WebProgramming/backend",
 *     description="API Server"
 * )
 */
/**
* @OA\SecurityScheme(
*     securityScheme="ApiKey",
*     type="apiKey",
*     in="header",
*     name="Authentication"
* )
*/
