<script>
import { login } from '../api/auth.js'
import { get_countries,get_cities,get_products, calculation } from '../api/calculation.js'
export default {
    data() {
        return {
            isLoading: false,
            isLoadingCities: false,
            isLoadingCountries: false,
            isLoadingProducts: false,


            password: "",
            errors: {},
            cities: [],
            countries: [],
            products: [],

            origin_id: null,
            destination_id: null,
            product_id: null,
            weight:null,
            result: null
        }
    },
    methods: {
        async Countries() {
            this.isLoadingCountries = true
            this.errors = {}
            try {
                const coutryResult = await get_countries()
                if (coutryResult.success) {
                    this.countries = coutryResult.data
                }
            } catch (error) {
                console.log("Error loading countries:", error)
            } finally {
                this.isLoadingCountries = false
            }
        },
        async CalculationAction() {
            this.isLoading = true
            this.errors = {}
            this.result = null
            try {
                const payload = {
                    "weight":this.weight,
                    "category_id": this.product_id,
                    "country_id":this.origin_id,
                    "destination_id": this.destination_id,
                }
                const result = await calculation(payload)
                if (result.success) {
                    this.result = result.data
                }
            } catch (error) {
                console.log("Error calculate:", error)
            } finally {
                this.isLoading = false
            }
        },
        async Products() {
            this.isLoadingProducts = true
            this.errors = {}
            try {
                const productsResult = await get_products(this.origin_id)
                if (productsResult.success) {
                    this.products = productsResult.data
                }
            } catch (error) {
                console.log("Error loading products:", error)
            } finally {
                this.isLoadingProducts = false
            }
        },
        async Cities() {
            this.isLoadingCities = true
            this.errors = {}
            try {
                const cityResult = await get_cities()
                if (cityResult.success) {
                    this.cities = cityResult.data.city
                }
            } catch (error) {
                console.log("Error loading cities:", error)
            } finally {
                this.isLoadingCities = false
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
    },
    async created() {
        await this.Cities()
        await this.Countries()
    }
}
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center">Hitung Ongkos Kirim</h5>
                <div v-html="generateErrorHTML(errors)"></div>
                <hr>
                <form action="POST" @submit.prevent="CalculationAction">
                    <div class="form-group">
                        <label for="coutries">Origin</label>
                        <select name="coutries" class="form-control" id="coutries" v-model="origin_id" @change="Products" required :disabled="isLoadingCountries">
                            <option selected disabled>Pilih Origin</option>
                            <option v-for="country in countries" :value="country.id" :key="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="coutries">Kategori Produk</label>
                        <select name="coutries" class="form-control" id="coutries" v-model="product_id" required>
                            <option selected disabled>Pilih Kategori Produk</option>
                            <option v-for="product in products" :value="product.id" :key="product.id">
                                {{ product.title }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="destination">Destinasi Kota</label>
                        <select name="destination" class="form-control" id="destination" v-model="destination_id" required  :disabled="isLoadingCities">
                            <option selected disabled>Pilih Destinasi</option>
                            <option v-for="city in cities" :value="city.city_id" :key="city.city_id">
                                {{ city.type }}, {{ city.city_name }}, {{ city.province }}, {{ city.postal_code }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="weight">Total Weight</label>
                        <input type="weight" class="form-control" v-model="weight" name="weight" id="weight" required placeholder="Masukan Weight">
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                        <span v-if="isLoading">Loading...</span>
                        <span v-else>Hitung</span>
                    </button>                
                </form>
            </div>
        </div>
        <div class="card mt-5" v-if="result">
            <div class="card-body">
                <h5 class="card-title text-center">Hasil Hitung</h5>
                <hr>
                <div class="row">
                    <div class="col-xl-4">
                        <span >Origin</span>
                        <div class="d-flex">
                        <div>
                            <img :src="`http://202.10.41.53:8000${result?.origin.flag}`" width="20px" alt="Flag">
                        </div>
                        <div class="ml-1">
                            <strong>{{ result?.origin.name }}</strong>
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="mr-3">
                        <span style="margin-right: 200px;">Destination</span>
                        </div>
                        <div>
                        <strong>{{ result?.destination.type }} {{ result?.destination.city_name }}, {{ result?.destination.province }}, {{ result?.destination.postal_code }}</strong>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="my-2">
                    <h5>International Shipping Price</h5>
                    <strong>Rp.{{ result?.international_price }}</strong>
                </div>
                <div class="my-2">
                    <h5>Domestic Shipping Price</h5>
                    <strong>Rp.{{ result?.domestic_price }}</strong>
                </div>
                <div class="my-2">
                    <h5>Total Shipping Price</h5>
                    <strong>Rp.{{ result?.total_price }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>
