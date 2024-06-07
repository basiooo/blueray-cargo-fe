<script>
import { login } from '../api/auth.js'

export default {
    data() {
        return {
            isLoading: false,
            email: "",
            password: "",
            errors: {},
        }
    },
    methods: {
        async loginAction() {
            this.isLoading = true
            this.errors = {}
            try {
                const payload = {
                    email: this.email,
                    password: this.password
                }
                const result = await login(payload)
                if (result.success) {
                    window.location.href = '/'
                } else {
                    this.errors = result.response.data
                }
            } catch (error) {
                this.errors = {
                    "errors": [`Kesalahan Tidak diketahui (${error.message})`]
                }
            } finally {
                this.isLoading = false
            }
        },
        generateErrorHTML(errors) {
            let errorList = '<ul>'

            for (const field in errors) {
                errorList += `<li>${field}<ul>`
                try {
                    errors[field].forEach(error => {
                        errorList += `<li>${error}</li>`
                    })
                } catch (err) {
                    errorList += `<li>${errors[field]}</li>`
                }
                errorList += '</ul></li>'
            }

            errorList += '</ul>'
            if (Object.keys(errors).length === 0) {
                return ''
            }
            return `
            <div class="alert alert-danger">
               <b>Terjadi Kesalahan</b>
               ${errorList} 
            </div>`
        }
    }
}
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center">Masuk</h5>
                <div v-html="generateErrorHTML(errors)"></div>
                <hr>
                <form action="POST" @submit.prevent="loginAction">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" class="form-control" v-model="email" name="email" id="email" required placeholder="Masukan email">
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="password" class="form-control" v-model="password" name="password" id="password" required placeholder="Masukan Password">
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                        <span v-if="isLoading">Loading...</span>
                        <span v-else>Masuk</span>
                    </button>                
                </form>
            </div>
        </div>
    </div>
</template>
