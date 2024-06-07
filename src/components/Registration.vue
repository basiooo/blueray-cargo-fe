<script>
import { registration } from '../api/auth.js'

export default {
    data() {
        return {
            isLoading: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            errors: {},
        }
    },
    methods: {
        async registrationAction() {
            this.isLoading = true
            this.errors = {}
            try {
                const payload = {
                    email: this.email,
                    password: this.password,
                    first_name: this.first_name,
                    last_name: this.last_name,
                }
                const result = await registration(payload)
                if (result.success) {
                    window.location.href = '/login'
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
                <h5 class="card-title text-center">Registrasi</h5>
                <div v-html="generateErrorHTML(errors)"></div>
                <hr>
                <form action="POST" @submit.prevent="registrationAction">
                    <div class="form-group">
                        <label for="first_name">Nama Awal</label>
                        <input type="first_name" class="form-control" v-model="first_name" name="first_name" id="first_name" required placeholder="Masukan Nama Awal">
                    </div>
                    <div class="form-group">
                        <label for="last_name">Nama Akhir</label>
                        <input type="last_name" class="form-control" v-model="last_name" name="last_name" id="last_name" required placeholder="Masukan Nama Akhir">
                    </div>
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
                        <span v-else>Daftar</span>
                    </button>                
                </form>
            </div>
        </div>
    </div>
</template>
