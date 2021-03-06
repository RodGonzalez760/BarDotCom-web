<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Cliente;
use App\Administrador_sistema;
use App\Administrador_local;
use App\Usuario_local;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    //protected $redirectTo = '/home';

    public function redirectTo(){
        try {
            $user=Auth::user();
            if(Administrador_sistema::find($user->id)!==null)
            {
                return '/dashAdminSys';
            }
            if(Administrador_local::find($user->id)!==null)
            {
                return '/dashAdminLocal';
            }
            if(Usuario_local::find($user->id)!==null)
            {
                return '/dashUsuarioLocal';
            }
            else
            {
                return '/dashCliente';
            }
        } catch (\Throwable $th) {
            return view('home');
        }
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
