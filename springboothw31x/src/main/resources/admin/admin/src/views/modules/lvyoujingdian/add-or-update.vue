<template>
	<div class="addEdit-block" :style='{"padding":"10px 30px"}' style="width: 100%;">
		<el-form
			:style='{"padding":"30px 15px","boxShadow":"0 0px 0px #999","borderRadius":"0px","flexWrap":"wrap","background":"none","display":"flex","justifyContent":"space-between"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="120px"
		>
			<template >
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="input" v-if="type!='info'"  label="景点名称" prop="jingdianmingcheng">
					<el-input v-model="ruleForm.jingdianmingcheng" placeholder="景点名称" clearable  :readonly="ro.jingdianmingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else class="input" label="景点名称" prop="jingdianmingcheng">
					<el-input v-model="ruleForm.jingdianmingcheng" placeholder="景点名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="upload" v-if="type!='info' && !ro.jingdiantupian" label="景点图片" prop="jingdiantupian">
					<file-upload
						tip="点击上传景点图片"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.jingdiantupian?ruleForm.jingdiantupian:''"
						@change="jingdiantupianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="upload" v-else-if="ruleForm.jingdiantupian" label="景点图片" prop="jingdiantupian">
					<img v-if="ruleForm.jingdiantupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.jingdiantupian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.jingdiantupian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="select" v-if="type!='info'"  label="景点分类" prop="jingdianfenlei">
					<el-select :disabled="ro.jingdianfenlei" v-model="ruleForm.jingdianfenlei" placeholder="请选择景点分类" >
						<el-option
							v-for="(item,index) in jingdianfenleiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else class="input" label="景点分类" prop="jingdianfenlei">
					<el-input v-model="ruleForm.jingdianfenlei"
						placeholder="景点分类" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="select" v-if="type!='info'"  label="景点等级" prop="jingdiandengji">
					<el-select :disabled="ro.jingdiandengji" v-model="ruleForm.jingdiandengji" placeholder="请选择景点等级" >
						<el-option
							v-for="(item,index) in jingdiandengjiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else class="input" label="景点等级" prop="jingdiandengji">
					<el-input v-model="ruleForm.jingdiandengji"
						placeholder="景点等级" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="input" v-if="type!='info'"  label="景点地址" prop="jingdiandizhi">
					<el-input v-model="ruleForm.jingdiandizhi" placeholder="景点地址" clearable  :readonly="ro.jingdiandizhi"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else class="input" label="景点地址" prop="jingdiandizhi">
					<el-input v-model="ruleForm.jingdiandizhi" placeholder="景点地址" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="input" v-if="type!='info'"  label="开放时间" prop="kaifangshijian">
					<el-input v-model="ruleForm.kaifangshijian" placeholder="开放时间" clearable  :readonly="ro.kaifangshijian"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else class="input" label="开放时间" prop="kaifangshijian">
					<el-input v-model="ruleForm.kaifangshijian" placeholder="开放时间" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' class="textarea" v-if="type!='info'" label="旅游特点" prop="lvyoutedian">
					<el-input
					  style="min-width: 200px; max-width: 600px;"
					  type="textarea"
					  :rows="8"
					  placeholder="旅游特点"
					  v-model="ruleForm.lvyoutedian" >
					</el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else-if="ruleForm.lvyoutedian" label="旅游特点" prop="lvyoutedian">
					<span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}'>{{ruleForm.lvyoutedian}}</span>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-if="type!='info'"  label="景点介绍" prop="jingdianjieshao">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.jingdianjieshao" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else-if="ruleForm.jingdianjieshao" label="景点介绍" prop="jingdianjieshao">
                    <span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}' v-html="ruleForm.jingdianjieshao"></span>
                </el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-if="type!='info'"  label="旅游文化" prop="lvyouwenhua">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.lvyouwenhua" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 30px 0","flexWrap":"wrap","textAlign":"left","background":"none","display":"block","width":"100%","justifyContent":"flex-start"}' v-else-if="ruleForm.lvyouwenhua" label="旅游文化" prop="lvyouwenhua">
                    <span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}' v-html="ruleForm.lvyouwenhua"></span>
                </el-form-item>
			<el-form-item :style='{"padding":"0","margin":"20px 0 0"}' class="btn">
				<el-button :style='{"cursor":"pointer","padding":"0 30px","margin":"0 20px 0 0","borderColor":"#1fbfae","color":"#1fbfae","outline":"none","borderRadius":"0px","background":"#e9faf8","borderWidth":"4px","width":"auto","lineHeight":"40px","fontSize":"14px","borderStyle":"solid double solid double","height":"44px"}'  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
				<el-button :style='{"cursor":"pointer","padding":"0 24px","margin":"0","borderColor":"#dc333b","color":"#dc333b","outline":"none","borderRadius":"0px","background":"#fbeced","borderWidth":"4px","width":"auto","lineHeight":"40px","fontSize":"14px","borderStyle":"solid double solid double","height":"44px"}' v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
				<el-button :style='{"cursor":"pointer","padding":"0 24px","margin":"0","borderColor":"#dc333b","color":"#dc333b","outline":"none","borderRadius":"0px","background":"#fbeced","borderWidth":"4px","width":"auto","lineHeight":"40px","fontSize":"14px","borderStyle":"solid double solid double","height":"44px"}' v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				jingdianmingcheng : false,
				jingdiantupian : false,
				jingdianfenlei : false,
				jingdiandengji : false,
				jingdiandizhi : false,
				kaifangshijian : false,
				lvyoutedian : false,
				jingdianjieshao : false,
				lvyouwenhua : false,
			},
			
			
			ruleForm: {
				jingdianmingcheng: '',
				jingdiantupian: '',
				jingdianfenlei: '',
				jingdiandengji: '',
				jingdiandizhi: '',
				kaifangshijian: '',
				lvyoutedian: '',
				jingdianjieshao: '',
				lvyouwenhua: '',
			},
		
			jingdianfenleiOptions: [],
			jingdiandengjiOptions: [],
			
			rules: {
				jingdianmingcheng: [
					{ required: true, message: '景点名称不能为空', trigger: 'blur' },
				],
				jingdiantupian: [
				],
				jingdianfenlei: [
				],
				jingdiandengji: [
				],
				jingdiandizhi: [
				],
				kaifangshijian: [
				],
				lvyoutedian: [
				],
				jingdianjieshao: [
				],
				lvyouwenhua: [
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
	created() {
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='jingdianmingcheng'){
							this.ruleForm.jingdianmingcheng = obj[o];
							this.ro.jingdianmingcheng = true;
							continue;
						}
						if(o=='jingdiantupian'){
							this.ruleForm.jingdiantupian = obj[o];
							this.ro.jingdiantupian = true;
							continue;
						}
						if(o=='jingdianfenlei'){
							this.ruleForm.jingdianfenlei = obj[o];
							this.ro.jingdianfenlei = true;
							continue;
						}
						if(o=='jingdiandengji'){
							this.ruleForm.jingdiandengji = obj[o];
							this.ro.jingdiandengji = true;
							continue;
						}
						if(o=='jingdiandizhi'){
							this.ruleForm.jingdiandizhi = obj[o];
							this.ro.jingdiandizhi = true;
							continue;
						}
						if(o=='kaifangshijian'){
							this.ruleForm.kaifangshijian = obj[o];
							this.ro.kaifangshijian = true;
							continue;
						}
						if(o=='lvyoutedian'){
							this.ruleForm.lvyoutedian = obj[o];
							this.ro.lvyoutedian = true;
							continue;
						}
						if(o=='jingdianjieshao'){
							this.ruleForm.jingdianjieshao = obj[o];
							this.ro.jingdianjieshao = true;
							continue;
						}
						if(o=='lvyouwenhua'){
							this.ruleForm.lvyouwenhua = obj[o];
							this.ro.lvyouwenhua = true;
							continue;
						}
				}
				









			}
			
			
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.$http({
				url: `option/jingdianfenlei/jingdianfenlei`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.jingdianfenleiOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
            this.jingdiandengjiOptions = "A,AA,AAA,AAAA,AAAAA".split(',')
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `lvyoujingdian/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.jingdianjieshao = this.ruleForm.jingdianjieshao.replace(reg,'../../../springboothw31x/upload');
        this.ruleForm.lvyouwenhua = this.ruleForm.lvyouwenhua.replace(reg,'../../../springboothw31x/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {




	if(this.ruleForm.jingdiantupian!=null) {
		this.ruleForm.jingdiantupian = this.ruleForm.jingdiantupian.replace(new RegExp(this.$base.url,"g"),"");
	}















var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "lvyoujingdian/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `lvyoujingdian/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.lvyoujingdianCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `lvyoujingdian/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.lvyoujingdianCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
			   }
			 });
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.lvyoujingdianCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    jingdiantupianUploadChange(fileUrls) {
	    this.ruleForm.jingdiantupian = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  text-shadow: 0 1px 10px #fff;
	  	  color: #666;
	  	  background: none;
	  	  font-weight: 500;
	  	  display: block;
	  	  width: 120px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 120px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border-radius: 0px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  background: #fff;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  border-color: #2adbcb;
	  	  border-width: 4px;
	  	  border-style: solid double solid double;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border-radius: 0px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  border-color: #2adbcb;
	  	  border-width: 4px;
	  	  border-style: solid double solid double;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 0px solid #333;
	  	  border-radius: 0px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  border-color: #2adbcb;
	  	  border-width: 4px;
	  	  border-style: solid double solid double;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  border: 2px solid #ddd;
	  	  cursor: pointer;
	  	  border-radius: 0px;
	  	  color: #2adbcb;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  border-color: #2adbcb;
	  	  border-width: 4px;
	  	  line-height: 90px;
	  	  border-style: solid double solid double;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 2px solid #ddd;
	  	  cursor: pointer;
	  	  border-radius: 0px;
	  	  color: #2adbcb;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  border-color: #2adbcb;
	  	  border-width: 4px;
	  	  line-height: 90px;
	  	  border-style: solid double solid double;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 2px solid #ddd;
	  	  cursor: pointer;
	  	  border-radius: 0px;
	  	  color: #2adbcb;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  border-color: #2adbcb;
	  	  border-width: 4px;
	  	  line-height: 90px;
	  	  border-style: solid double solid double;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border-radius: 0px;
	  	  padding: 12px;
	  	  box-shadow: 0 0 0px #4b681d;
	  	  outline: none;
	  	  color: #666;
	  	  width: 500px;
	  	  font-size: 14px;
	  	  min-height: 120px;
	  	  border-color: #2adbcb;
	  	  border-width: 4px;
	  	  border-style: solid double solid double;
	  	  height: auto;
	  	}
</style>
