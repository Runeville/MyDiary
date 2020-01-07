@extends('layouts.app')

@section('content')
<div class="container">
    <h1 class="text-center">Open your diary</h1>
    <div class="row justify-content-center">
        <div class="card-body">
            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="form-group row mb-4">
                    <div class="col-md-3"></div>
                    <label for="email"></label>
                    <div class="col-md-6">
                        <input id="email" type="email" class="form-control form-reg text-center @error('email') is-invalid @enderror" placeholder="Email" name="email" autocomplete="email" required>
                    </div>
                    <div class="col-md-3"></div>
                </div>

                <div class="form-group row row mb-2">
                    <label for="password"></label>
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <input id="password" type="password" class="form-control form-reg text-center @error('password') is-invalid @enderror" name="password" placeholder="Password" autocomplete="new-password" required>
                        @error('password')
                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                    </div>
                    <div class="col-md-3"></div>
                </div>

                <div class="form-group row">
                    <div class="col-md-6 offset-md-4">
                        <div class="form-check d-flex">
                            <input style="margin-top: 3%;" class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                            <label class="form-check-label" for="remember">
                                {{ __('Remember Me') }}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                        <button type="submit" class="btn btn-reg">
                            {{ __('Login') }}
                        </button>

                        @if (Route::has('password.request'))
                            <a class="btn btn-pass" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
