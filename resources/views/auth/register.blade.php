@extends('layouts.app')

@section('content')
<div class="container" style="max-width: 1000px">

    <h1 class="text-center mb-4">Make your online diary</h1>

    <form method="POST" action="{{ route('register') }}">
        @csrf

{{--    NAME    --}}
        <div class="form-group row mb-4">

            <label for="name"></label>
            <div class="col-md-6 offset-md-3">
                <input id="name" type="text" class="text-center form-control form-reg @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" autocomplete="off" placeholder="Name" required autofocus>

                @error('name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
        </div>

{{--    EMAIL    --}}
        <div class="form-group row mb-4">
            <div class="col-md-3"></div>
            <label for="email"></label>
            <div class="col-md-6 d-flex justify-content-center">
                <input id="email" type="email" class="text-center form-control form-reg @error('email') is-invalid @enderror" placeholder="Email" name="email" autocomplete="email" required>
            </div>
            <div class="col-md-3"></div>
        </div>

{{--    LAST TWO INPUTS (PASSWORD)    --}}
        <div class="form-group row mb-4">
            <label for="password"></label>

            <div class="col-md-6 offset-md-3">
                <input id="password" type="password" class="text-center form-control form-reg @error('password') is-invalid @enderror" name="password" placeholder="Password" autocomplete="new-password" required>
                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
        </div>

        <div class="form-group row mb-4">
            <label for="password-confirm"></label>
            <div class="col-md-6 offset-md-3">
                <input id="password-confirm" type="password" class="text-center form-control form-reg" name="password_confirmation" placeholder="Confirm passwrod" autocomplete="new-password" required>
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-reg">
                    Make diary
                </button>
            </div>
        </div>
    </form>

</div>
@endsection
